<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="container">
    <button class="language-button" @click="toggleLanguage">{{ language }}</button>
    <div class="search-form">
      <h2>{{ translateLanguage('search_articles') }}</h2>
      <form @submit.prevent="filterArticles">
        <input type="text" v-model="searchText">
        <button type="submit">{{ translateLanguage('search_button') }}</button>
      </form>
    </div>

    <div class="article-tiles" v-if="articles.length != 0">
      <div class="tiles-container">
        <div v-for="article in filteredArticles" :key="article.guid" class="article-tile">
          <h3>{{ article.title }}</h3>
          <p>{{ translateLanguage('publication_date') }}: {{ article.pubDate }}</p>
          <p>{{ translateLanguage('categories') }}: {{ article.category.join(', ') }}</p>
          <RouterLink :to="{name: 'articleDetails', params: { guid: article.guid, language: language }}">{{ translateLanguage('details') }}</RouterLink>
        </div>
      </div>
    </div>
    <div class="article-tiles" v-else>
      <div class="loader-wrapper" v-if="isLoading">
        <span class="loader"></span>
      </div>
      <h2 style="text-align: center;" v-if="!isLoading">{{ translateLanguage('not_found') }}</h2>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      articles: [],
      filteredArticles: [],
      searchText: '',
      language: 'pl',
      isLoading: true
    };
  },
  async created() {
    await this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await axios.get(`http://localhost:8000/articles?lang=${this.language}`);
        this.articles = response.data
        this.filteredArticles = response.data;
        this.isLoading = false;
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },
    filterArticles() {
      this.filteredArticles = this.articles.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(this.searchText.toLowerCase());
        const categoryMatch = article.category.some(category => category.toLowerCase().includes(this.searchText.toLowerCase()));
        return titleMatch || categoryMatch;
      });
    },
    toggleLanguage() {
      this.language = this.language === 'pl' ? 'en' : 'pl';
      this.articles = [];
      this.filteredArticles = [];
      this.isLoading = true;
      this.fetchArticles();
    },
    translateLanguage(element) {
      const translations = {
        'pl': {
          'search_articles': 'Wyszukaj artykuły',
          'search_button': 'Szukaj',
          'categories': 'Kategorie',
          'publication_date': 'Data publikacji',
          'details': 'Szczegóły',
          'not_found': 'Nie udało się pobrać listy artykułów'
        },
        'en': {
          'search_articles': 'Search articles',
          'search_button': 'Search',
          'categories': 'Categories',
          'publication_date': 'Publication date',
          'details': 'Details',
          'not_found': 'Articles not found'
        }
      };
      return translations[this.language][element];
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 1200px;
}

.language-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.search-form {
  margin-bottom: 20px;
}

.search-form h2 {
  text-align: center;
}

.article-tiles {
  width: 100%;
}

.tiles-container {
  display: flex;
  flex-wrap: wrap;
}

.article-tile {
  width: calc(50% - 20px);
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
}

.article-tile h3 {
  text-align: justify;
  margin-bottom: 5px;
}

.article-tile p {
  margin: 0;
}

.loader-wrapper {
  position: fixed;
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: calc(50vh - 55px);
  left: calc(50vw - 55px);;
}
.loader {
  width: 100px;
  height: 100px;
  border: 5px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
</style>