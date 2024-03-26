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

    <div class="article-tiles">
      <div class="tiles-container">
        <div v-for="article in filteredArticles" :key="article.id" class="article-tile">
          <h3>{{ article.title }}</h3>
          <p>{{ translateLanguage('publication_date') }}: {{ article.pubDate }}</p>
          <p>{{ translateLanguage('categories') }}: {{ article.category }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      filteredArticles: [],
      searchText: '',
      language: 'pl'
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
    try {
      const response = await fetch(`http://localhost:8000/articles?lang=${this.language}`);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
      this.articles = data;
      this.filteredArticles = data;
    } catch (error) {
      console.error(error);
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
      this.fetchArticles();
    },
    translateLanguage(element) {
      const translations = {
        'pl': {
          'search_articles': 'Wyszukaj artykuły',
          'search_button': 'Szukaj',
          'categories': 'Kategorie',
          'publication_date': 'Data publikacji'
        },
        'en': {
          'search_articles': 'Search Articles',
          'search_button': 'Search',
          'categories': 'Categories',
          'publication_date': 'Publication Date'
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
</style>