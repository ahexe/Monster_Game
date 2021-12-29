const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            round: 0,
            winner: null
        };
    },
    watch: {
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
            }
        },
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        }
    },
    computed: {
        monsterBarStyle() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyle() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.playerHealth + '%' };
        },
        currentRounds() {
            return this.round % 3 !== 0;
        },

    },
    methods: {
        playerAttack() {
            this.round++;
            const attackValue = getRandomNumber(5, 12);
            this.monsterHealth -= attackValue;
            this.monsterAttack();
        },
        monsterAttack() {
            const attackValue = getRandomNumber(8, 15);
            this.playerHealth -= attackValue;
        },
        specialAttack() {
            this.round++;
            const attackValue = getRandomNumber(10, 20);
            this.monsterHealth -= attackValue;
            this.monsterAttack();
        },
        healPlayer() {
            this.round++;
            const healValue = getRandomNumber(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.monsterAttack();
        },
        surrender() {
            this.winner = "monster";
        },
        gameRestart() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.round = 0;
            this.winner = null;
        }
    }
});

app.mount(`#game`);