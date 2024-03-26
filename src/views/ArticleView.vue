<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="return-link">
    <RouterLink :to="{name: 'home'}">{{ translateLanguage('back') }}</RouterLink>
  </div>
  <div class="container">
      <h2>{{ article.title }}</h2>
      <span id="article-description">{{ article.description }}</span>
      <span id="article-category">{{ translateLanguage('categories') }}: {{ article.category }}</span>
      <span id="article-link"><a :href="article.link" target="_blank">{{ translateLanguage('link') }}</a></span>
  </div>
</template>

<script>
export default {
  props: {
    guid: String,
    language: String
  },
  data() {
    return {
      article: null,
    };
  },
  async created() {
    await this.fetchArticle();
  },
  methods: {
    async fetchArticle() {
    try {
      const response = await fetch(`http://localhost:8000/article/${this.guid}?lang=${this.language}`);
      if (!response.ok) {
        throw new Error('Nie udało się pobrać artykułu');
      }
      const data = await response.json();
      this.article = data;
    } catch (error) {
      console.error(error);
    }},
    translateLanguage(element) {
      const translations = {
        'pl': {
          'categories': 'Kategorie',
          'link': 'Całość artykułu',
          'back': 'Powrót do listy artykułów'
        },
        'en': {
          'categories': 'Categories',
          'link': 'Full article',
          'back': 'Return to article list'
        }
      };
      return translations[this.language][element];
    }
  }
};
</script>

<style scoped>
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
</style>