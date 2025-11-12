<template>
  <section class="PopularGame">
    <h2>Popular Game</h2>
    <p>You can fond the most popular game of Game Quest's user.</p>
    <div class="games">
      <RouterLink to="/game/LeagueOfLegends"><img src="https://wiki.leagueoflegends.com/en-us/images/thumb/Season_2024_Promo_01.jpg/800px-Season_2024_Promo_01.jpg?c6d35"/><p>League of Legends</p></RouterLink>
      <RouterLink to="/game/TeamFightTactics"><img src="https://raiseyourgame.com/wp-content/uploads/2022/08/Andy_Teamfight_Podcast_Optional_Featured_sm_792x447.jpg"/><p>Teamfight Tactics</p></RouterLink>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.PopularGame {
  padding: 3rem;
  text-align: center;
}
.games{
  display: flex;
  gap: 24px;
  align-items: flex-start;
  padding: 18px;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06));
  box-shadow: 0 6px 18px rgba(11,10,20,0.45);
}
.games a {
  text-decoration: none;
  flex: 1;
  min-width: 200px;
  background: rgba(255, 255, 255, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  border-radius: 6px;
}
.games a:hover {
  box-shadow: 0 6px 18px rgba(11,10,20,0.45);
}
.games img {
  width: 40%;
  border-radius: 10px;
}
.games p {

  margin: 0;
  line-height: 1.55;
  color: #008ecf;
  font-size: 0.98rem;
  background: rgba(255,255,255,0.01);
  padding: 10px 12px;
  border-radius: 6px;
}
</style>
