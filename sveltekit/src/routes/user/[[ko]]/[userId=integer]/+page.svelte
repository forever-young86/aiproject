<script>
    import { page } from '$app/stores';  // import page from '' 와 다름 주의!
    /* const { params } = $page; // $가 붙은건 객체
    const { userId } = params; */

    const { userId } = $page.params; // 표현식만 다를, 위와 같은 기능
    const { ko } = $page.params;

    console.log(userId);
    console.log(ko);
    console.log($page.params.userId);
</script>

{#if ko === 'en'}
    <h1> user id: {userId}</h1>
{:else}
    <h1> 유저 아이디 : {userId}</h1>
{/if} 