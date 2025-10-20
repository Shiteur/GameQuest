<template>
    <h2>Teamfight Tactics</h2>
    <section class="Descprtion">
        <h3>Description</h3>
        <img src="https://raiseyourgame.com/wp-content/uploads/2022/08/Andy_Teamfight_Podcast_Optional_Featured_sm_792x447.jpg"/>
        <div class="content">
            <p>
                Teamfight Tactics (TFT) is an autobattler developed by Riot Games where players build and manage a team of champions on a board. 
                It is necessary to combine origins and classes to create synergies, equip and merge units, and manage one’s economy between the rounds. 
                The fights take place automatically against other players. 
                The strategy lies in the placement, the choice of champions and adaptation to rotations and objects. 
                TFT offers seasonal sets, a classified mode and a mix of strategy, decision-making, and random elements.
            </p>
        </div>
    </section>
    <ChallengeListGame game="TeamfightTactics"/>
</template>

<script>
  import ChallengeListGame from '@/components/ChallengeListGame.vue';

export default{
  name: 'TeamfightTactics',
  components: {
    ChallengeListGame
  }
}
</script>
