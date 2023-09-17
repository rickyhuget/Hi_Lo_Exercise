import { Component } from '@angular/core';

@Component({
  selector: 'card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.css']
})
export class CardDisplayComponent {
  title = "Card Drawn";
  card_image = getCardCover();
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
}

class Shoe  {
  private runningCount: number;
  private numOfDecks: number = 0;
  public cardStack: Card[] = [];

  public constructor(numOfDecks: number)  {
    this.runningCount = 0;
    this.numOfDecks = numOfDecks;
    this.cardStack = createShuffledCardStack(numOfDecks);
  }

}

function createShuffledCardStack(numOfDecks: number): any {
  let shoeStack: any = createCardStack(numOfDecks)
  //shuffle(shoeStack);
  return shoeStack
}
  
function createCardStack(numOfDecks: number): any  {
  const cardStack: Card[] = [];
  for (let i = 0; i < numOfDecks; i++)  {
    for (let j = 2; j < 10; j++) {
      // ASCII value used by adding 48 and converting to char
      // value and suit are used to identify appropriate image in file 'card_images'
      cardStack.push(new Card((j+48).toString(), 'S', "card_images/PlayingCard_" + (j+48).toString() + 'S' + ".GIF"))
      cardStack.push(new Card((j+48).toString(), 'H', "card_images/PlayingCard_" + (j+48).toString() + 'H' + ".GIF"))
      cardStack.push(new Card((j+48).toString(), 'D', "card_images/PlayingCard_" + (j+48).toString() + 'D' + ".GIF"))
      cardStack.push(new Card((j+48).toString(), 'C', "card_images/PlayingCard_" + (j+48).toString() + 'C' + ".GIF"))
    }
  
    let faceCards: string[] = ['T', 'J', 'Q', 'K', 'A'] // value of 10 is included in faceCards[] as 'T'

    for (let j = 0; j < 5; j++)  {
      // value and suit are used to identify appropriate image in file 'card_images'
      cardStack.push(new Card(faceCards[j], 'S', "card_images/PlayingCard_" + faceCards[j] + 'S' + ".GIF"))
      cardStack.push(new Card(faceCards[j], 'H', "card_images/PlayingCard_" + faceCards[j] + 'H' + ".GIF"))
      cardStack.push(new Card(faceCards[j], 'D', "card_images/PlayingCard_" + faceCards[j] + 'D' + ".GIF"))
      cardStack.push(new Card(faceCards[j], 'C', "card_images/PlayingCard_" + faceCards[j] + 'C' + ".GIF"))
      return cardStack
    }
  }
    
}
