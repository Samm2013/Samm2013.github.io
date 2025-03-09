from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

class Player:
    def __init__(self, money=30):
        self.money = money
        self.inventory = {}

    def buy(self, item, price):
        if self.money >= price:
            self.money -= price
            if item in self.inventory:
                self.inventory[item] += 1
            else:
                self.inventory[item] = 1
            return True
        return False

player = Player()

shop_items = {
    "apple": 20,
    "banana": 10,
    "berries": 5,
    "orange": 15,
    "mango": 25
}

@app.route('/')
def index():
    return render_template('game.html', player=player, shop_items=shop_items)

@app.route('/buy', methods=['POST'])
def buy():
    item = request.form['item']
    if item in shop_items:
        if player.buy(item, shop_items[item]):
            message = f"You bought {item} for ${shop_items[item]}."
        else:
            message = "Not enough money!"
    else:
        message = "Invalid item."
    
    # Random event
    if random.random() < 0.2:  # 20% chance of a random event
        event_type = random.choice(["find", "lose"])
        amount = random.randint(1, 10)
        if event_type == "find":
            player.money += amount
            message += f" You found ${amount} on the ground!"
        else:
            player.money = max(0, player.money - amount)
            message += f" Oh no! You lost ${amount}!"

    return jsonify({
        'money': player.money,
        'inventory': player.inventory,
        'message': message
    })

if __name__ == '__main__':
    app.run(debug=True)
