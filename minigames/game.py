import random

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
            print(f"You bought {item} for ${price}.")
        else:
            print("Not enough money!")

    def check_inventory(self):
        if self.inventory:
            print("Your inventory:")
            for item, quantity in self.inventory.items():
                print(f"- {item}: {quantity}")
        else:
            print("Your inventory is empty.")

class Shop:
    def __init__(self):
        self.items = {
            "apple": 20,
            "banana": 10,
            "berries": 5,
            "orange": 15,
            "mango": 25
        }

    def display(self):
        print("SHOP ITEMS:")
        for item, price in self.items.items():
            print(f"- {item.capitalize()}: ${price}")

def main():
    player = Player()
    shop = Shop()

    while True:
        print(f"\nYou currently have ${player.money}")
        shop.display()

        choice = input("What do you want to buy? (or 'exit' to quit, 'inventory' to check): ").lower()

        if choice == 'exit':
            print("Thanks for shopping!")
            break
        elif choice == 'inventory':
            player.check_inventory()
        elif choice in shop.items:
            player.buy(choice, shop.items[choice])
        else:
            print("Invalid choice. Please try again.")

        # Random event
        if random.random() < 0.2:  # 20% chance of a random event
            event_type = random.choice(["find", "lose"])
            amount = random.randint(1, 10)
            if event_type == "find":
                player.money += amount
                print(f"You found ${amount} on the ground!")
            else:
                player.money = max(0, player.money - amount)
                print(f"Oh no! You lost ${amount}!")

if __name__ == "__main__":
    main()
