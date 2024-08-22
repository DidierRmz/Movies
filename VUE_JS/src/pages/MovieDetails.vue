<template>
    <div v-if="loading" class="loading">Cargando detalles de la película...</div>
    <div v-else-if="movie" class="movie-details">
        <h1>{{ movie.Title }}</h1>
        <img :src="movie.Poster" :alt="movie.Title" />
        <p><strong>Año:</strong> {{ movie.Year }}</p>
        <p><strong>Tipo:</strong> {{ movie.Type }}</p>
        <p class="sinopsis"><strong>Sinopsis:</strong> {{ movie.Plot }}</p>
        <p><span>Director:</span> {{ movie.Director }}</p>
        <p><span>Reparto:</span> {{ movie.Actors }}</p>
        <p><span>Duración:</span> {{ movie.Runtime }}</p>
    </div>
    <div v-else class="error">No se encontraron detalles para esta película.</div>
    <router-link to="/" class="back-button">⬅ Regresar</router-link>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import HTTP from '@/api/client-http';

const route = useRoute();
const movieId = route.params.id as string;
const movie = ref(null);
const loading = ref(true);

async function fetchMovieDetails() {
    try {
        const response = await HTTP.get('', {
            params: {
                i: movieId,
            },
        });
        movie.value = response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchMovieDetails();
    
});

</script>

<style lang="scss" scoped>
$red: #ff0000;

.loading {
    text-align: center;
    color: $white;
}

.movie-details {
    text-align: center;
    color: $white;

    img {
        width: 300px;
        border-radius: 10px;
    }

    p {
        font-size: 1.2em;
    }
}

.error {
    color: $red;
    text-align: center;
}

.back-button {
    display: inline-block;
    margin-top: 20px;
    color: $primary;
    font-weight: bold;
    text-decoration: none;
    border: 2px solid $primary;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    margin: 0 auto;

    &:hover {
        background: $primary;
        color: $white;
    }
}

.sinopsis {
    font-size: 1.2em;
    line-height: 1.5em;
    margin-top: 20px;
    padding: 0 15px;
}


.movie-details {
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

</style>