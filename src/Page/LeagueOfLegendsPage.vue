<template>
    <h2>League Of Legends</h2>
    <section class="Descprtion">
        <h3>Description</h3>
        <img src="https://wiki.leagueoflegends.com/en-us/images/thumb/Season_2024_Promo_01.jpg/800px-Season_2024_Promo_01.jpg?c6d35"/>
        <div class="content">
            <p>
                League of Legends (LoL) is a multiplayer online battle arena-type video game (MOBA) developed by Riot Games. 
                Two teams of five players compete to destroy the opposing base by controlling champions with unique skills, 
                by coordinating their actions and adapting their strategy in real time. The game stands out for its strategic depth, 
                its regular updates and a global competitive scene. Free of access, LoL offers a wide variety of champions, 
                of objects and roles to suit all styles of play.
            </p>
        </div>
    </section>
    <ChallengeListGame game="LeagueOfLegends"/>
</template>

<script>
import ChallengeListGame from '@/components/ChallengeListGame.vue';

export default{
  name: 'LeagueOfLegends',
  components: {
    ChallengeListGame
  }
}
</script>