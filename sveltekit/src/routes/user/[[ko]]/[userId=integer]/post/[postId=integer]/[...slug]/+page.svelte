<script>
    import { page } from '$app/stores';  

    const { slug } = $page.params;

    const slugArr = $page.params.slug.split('/');


   // console.log(slug);
   console.log(slugArr);
</script>

<h1>Rest Parameters</h1>
<h2>[...slug] = {slug}</h2>
{#each slugArr as slug, i}
<h4>slug {i+1} : {slug}</h4>
{/each}