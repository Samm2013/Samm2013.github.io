// Enhanced game.js
const GameGoals = {
    moneyTarget: 100,
    requiredItems: { apple: 3, banana: 5 },
    maxTurns: 20
};

let currentTurn = 1;
let gameActive = true;

function checkGoals(inventory) {
    // Check money goal
    const moneyGoal = player.money >= GameGoals.moneyTarget;
    
    // Check inventory goals
    let inventoryGoal = true;
    for(const [item, quantity] of Object.entries(GameGoals.requiredItems)) {
        if((inventory[item] || 0) < quantity) {
            inventoryGoal = false;
            break;
        }
    }
    
    // Check turn limit
    const turnsLeft = GameGoals.maxTurns - currentTurn;
    
    return { moneyGoal, inventoryGoal, turnsLeft };
}

function updateGoalsDisplay(goals) {
    const goalsElement = document.getElementById('game-goals');
    goalsElement.innerHTML = `
        <h3>Game Goals (Turn ${currentTurn}/${GameGoals.maxTurns})</h3>
        <p>💰 Reach $${GameGoals.moneyTarget}: ${goals.moneyGoal ? '✅' : '❌'}</p>
        <p>🛒 Collect items (3 apples, 5 bananas): ${goals.inventoryGoal ? '✅' : '❌'}</p>
        <p>⏳ Turns remaining: ${goals.turnsLeft}</p>
    `;

    if(goals.moneyGoal && goals.inventoryGoal) {
        endGame(true);
    } else if(currentTurn >= GameGoals.maxTurns) {
        endGame(false);
    }
}

function endGame(won) {
    gameActive = false;
    document.querySelectorAll('#shop-items button').forEach(btn => btn.disabled = true);
    document.getElementById('message').textContent = won ? 
        '🎉 Congratulations! You won the game!' : 
        '😞 Game Over! You ran out of turns.';
    
    // Send game results to backend
    $.post('/save-game', {
        won: won,
        finalMoney: player.money,
        inventory: player.inventory,
        turns: currentTurn
    });
}

// Modified buyItem function with turn system
function buyItem(item, price) {
    if(!gameActive) return;
    
    $.post('/buy', { item: item }, function(data) {
        player.money = data.money;
        player.inventory = data.inventory;
        currentTurn++;
        
        updateDisplay(data);
        const goalsStatus = checkGoals(player.inventory);
        updateGoalsDisplay(goalsStatus);
        
        // Add random event handling
        if(data.message) {
            showRandomEvent(data.message);
        }
    });
}

function showRandomEvent(message) {
    const eventElement = document.createElement('div');
    eventElement.className = 'random-event';
    eventElement.textContent = `⚡ Random Event: ${message}`;
    document.getElementById('message').appendChild(eventElement);
}

// Initialize game
$(document).ready(function() {
    // Get initial goals from backend
    $.get('/get-goals', function(goals) {
        GameGoals = goals;
        updateGoalsDisplay(checkGoals({}));
    });
    
    // Load initial state
    updateDisplay({
        money: {{ player.money }},
        inventory: {{ player.inventory|tojson }},
        message: ''
    });
});
