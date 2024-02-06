<script>
    import TestComponent from "./testComponent.svelte";
    const name = 'richard';
</script>


<h1>SvelteKit</h1>
<p>Visit
<br>
    <a href="/user">User</a> 
<br>
user list</p>  <!--<a href="./restapi"> : linked route-->

<TestComponent data={name}/> <!--만약 data를 name 이라고 명하면 TestComponent파일에서도 모두 name으로 바꾸고, 여기서는 <TestComponent{name}/>로 축약해서 작성 가능!-->