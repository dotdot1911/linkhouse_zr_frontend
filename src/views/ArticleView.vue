<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="return-link">
    <RouterLink :to="{name: 'home'}">{{ translateLanguage('back') }}</RouterLink>
  </div>
  <div class="container" v-if="article">
      <h2>{{ article.title }}</h2>
      <span id="article-description" v-html="article.description"></span>
      <span id="article-category">{{ translateLanguage('categories') }}: {{ article.category.join(', ') }}</span>
      <span id="article-link"><a :href="article.link" target="_blank">{{ translateLanguage('link') }}</a></span>
  </div>
  <div class="container" v-if="!article && !isLoading">
    <h2>{{ translateLanguage('not_found') }}</h2>
  </div>
  <div class="loader-wrapper" v-if="isLoading">
      <span class="loader"></span>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    guid: String,
    language: String
  },
  data() {
    return {
      article: null,
      isLoading: true
    };
  },
  async created() {
    await this.fetchArticle();
  },
  methods: {
    async fetchArticle() {
      await axios.get(`http://localhost:8000/article/${this.guid}?lang=${this.language}`)
      .then((response)=>{
        const data = response.data;
        this.article = data;
        this.isLoading = false;
      })
      .catch((error)=>{
        console.warn(error)
        this.isLoading = false;
      });
    },
    translateLanguage(element) {
      const translations = {
        'pl': {
          'categories': 'Kategorie',
          'link': 'Całość artykułu',
          'back': 'Powrót do listy artykułów',
          'not_found': 'Nie znaleziono wybranego artykułu'
        },
        'en': {
          'categories': 'Categories',
          'link': 'Full article',
          'back': 'Return to article list',
          'not_found': 'Article not found'
        }
      };
      return translations[this.language][element];
    }
  }
};
</script>

<style scoped>
.return-link {
  min-width: 80vw;
}
.container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}
#article-description {
  text-align: justify;
  margin-top: 10px;
  margin-bottom: 10px;
}
#article-category {
  width: 100%;
}
.return-link {
  margin-top: 10px;
  margin-bottom: 10px;
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