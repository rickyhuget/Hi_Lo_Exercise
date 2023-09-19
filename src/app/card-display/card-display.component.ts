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

  public nextCard(): void  {
    //delay(1000);
    this.card_image = "../assets/" + this.currentShoe.getCardImageUrl(this.currentShoeIndex);
    this.currentShoeIndex++;
    //this.nextCard();
  }
  // blur 'Begin' button
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
  //private numOfDecks: number;
  private cardStack: Card[] = [];

  public constructor(numOfDecks: number)  {
    this.runningCount = 0;
    //this.numOfDecks = numOfDecks;
    this.cardStack = createShuffledCardStack(numOfDecks);
  }

  public getRunningCount(): number  {
    return this.runningCount;
  }

  public getCardImageUrl(index: number): string  {
    return this.cardStack[index].getCardImageUrl();
  }

}

function createShuffledCardStack(numOfDecks: number): any {
  let shoeStack: any = createCardStack(numOfDecks);
  //shuffle(shoeStack);
  return shoeStack;
}
  
function createCardStack(numOfDecks: number): any  {
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
