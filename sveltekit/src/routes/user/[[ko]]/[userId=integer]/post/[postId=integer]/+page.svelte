<script>
    import { page } from '$app/stores';  

    const { userId, postId } = $page.params;

    console.log(userId);
    console.log(postId);
</script>

<h1>User {userId}번 님의 Post {postId} 번 내용입니다.</h1>
<h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet impedit iure rem dolorum natus iste maiores consequuntur ab, quas in expedita magnam placeat obcaecati alias itaque necessitatibus. Impedit, fugit neque?</h3>
<!--lorem 치면 바로 알아서 내용 생성해줌--> 