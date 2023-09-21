import { Component } from '@angular/core';

@Component({
  selector: 'card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.css']
})
export class CardDisplayComponent {
  title = "Card Drawn";
  card_image: string;
  currentShoe: Shoe;
  currentShoeIndex: number

  public constructor()  {
    this.card_image = getCardCover();
    this.currentShoeIndex = 0;
    this.currentShoe = new Shoe(1);
  }

  async beginDealing()  {
    // blur 'Begin' button
    let numOfCardsToBeDealt: number = (this.currentShoe.getNumOfDecks() * 40)
    for (let i = 0; i < numOfCardsToBeDealt; i++)  {
      await delay(500);
      this.dealNextCard();
    }
    await delay(1000);
    this.card_image = getCardCover();
  }

  public dealNextCard(): void  {
    this.card_image = "../assets/" + this.currentShoe.getCardImageUrl(this.currentShoeIndex);
    this.currentShoeIndex++;
  }
}

function delay(ms: number)  {
  return new Promise(resolve => {setTimeout(resolve, ms);
  });
}

function getCardCover(): string  {
  return "../assets/card_images/PlayingCard_0_cover.GIF";
}

class Card  {
  private value: string;
  private suit: string;
  private cardImageUrl: string;

  public constructor(value: string, suit: string, cardImageUrl: string)  {
    this.value = value;
    this.suit = suit;
    this.cardImageUrl = cardImageUrl;
  }

  public getCardValue(): string  {
    return this.value;
  }

  public getCardSuit(): string  {
    return this.suit;
  }

  public getCardImageUrl(): string  {
    return this.cardImageUrl;
  }
}

class Shoe  {
  private runningCount: number;
  private numOfDecks: number;
  private cardStack: Card[] = [];

  public constructor(numOfDecks: number)  {
    this.runningCount = 0;
    this.numOfDecks = numOfDecks;
    this.cardStack = createShuffledCardStack(numOfDecks);
  }

  public getRunningCount(): number  {
    return this.runningCount;
  }

  public getNumOfDecks(): number  {
    return this.numOfDecks;
  }

  public getCardImageUrl(index: number): string  {
    return this.cardStack[index].getCardImageUrl();
  }

}

function shuffle(array: any[]): any[]  {
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

function createShuffledCardStack(numOfDecks: number): Card[] {
  let shoeStack: Card[] = createCardStack(numOfDecks);
  shuffle(shoeStack);
  return shoeStack;
}
  
function createCardStack(numOfDecks: number): Card[]  {
  const cardStack: Card[] = [];
  for (let i = 0; i < numOfDecks; i++)  {
    for (let j = 2; j < 10; j++) {
      // ASCII value used by adding 48 and converting to char
      // value and suit are used to identify appropriate image in file 'card_images'
      cardStack.push(new Card((j).toString(), 'S', "card_images/PlayingCard_" + (j).toString() + 'S' + ".GIF"))
      cardStack.push(new Card((j).toString(), 'H', "card_images/PlayingCard_" + (j).toString() + 'H' + ".GIF"))
      cardStack.push(new Card((j).toString(), 'D', "card_images/PlayingCard_" + (j).toString() + 'D' + ".GIF"))
      cardStack.push(new Card((j).toString(), 'C', "card_images/PlayingCard_" + (j).toString() + 'C' + ".GIF"))
    }
  
    let faceCards: string[] = ['T', 'J', 'Q', 'K', 'A'] // value of 10 is included in faceCards[] as 'T'

    for (let j = 0; j < 5; j++)  {
      // value and suit are used to identify appropriate image in file 'card_images'
      cardStack.push(new Card(faceCards[j], 'S', "card_images/PlayingCard_" + faceCards[j] + 'S' + ".GIF"))
      cardStack.push(new Card(faceCards[j], 'H', "card_images/PlayingCard_" + faceCards[j] + 'H' + ".GIF"))
      cardStack.push(new Card(faceCards[j], 'D', "card_images/PlayingCard_" + faceCards[j] + 'D' + ".GIF"))
      cardStack.push(new Card(faceCards[j], 'C', "card_images/PlayingCard_" + faceCards[j] + 'C' + ".GIF"))
      
    }
  }
  return cardStack;
}
