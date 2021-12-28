const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100
        };
    },
    computed: {
        monsterBarStyle() {
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyle() {
            return { width: this.playerHealth + '%' };
        }
    },
    methods: {
        playerAttack() {
            const attackValue = getRandomNumber(5, 12);
            this.monsterHealth -= attackValue;
            this.monsterAttack();
        },
        monsterAttack() {
            const attackValue = getRandomNumber(8, 15);
            this.playerHealth -= attackValue;
            console.log(this.playerHealth);
        }
    }
});

app.mount(`#game`);