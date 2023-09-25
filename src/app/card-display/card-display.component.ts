import { Component } from '@angular/core';

@Component({
  selector: 'card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.css']
})
export class CardDisplayComponent {
  title = "Card Drawn";
  image_file_path: string = "../assets/";
  card_image: string;
  currentShoe: Shoe;
  numOfDecks: number = 1;
  runningCount: number;
  runningCountDisplay: string = "";
  userTerminated: boolean = false;
  //beginButton = document.getElementById('BeginButton') as HTMLButtonElement | null; 

  public constructor()  {
    this.card_image = getCardCover(this.image_file_path);
    this.currentShoe = new Shoe(this.numOfDecks);
    this.runningCount = 0;
  }

  async beginDealing()  {
    // blur 'Begin' button
    const beginButton = document.getElementById('BeginButton') as HTMLButtonElement | null;
    //this.disableButton(this.beginButton);
    beginButton?.setAttribute('disabled','');
    // unblur 'newDeckButton'
    const newDeckButton = document.getElementById('newDeckButton') as HTMLButtonElement | null;
    newDeckButton?.removeAttribute('disabled');


    let numOfCardsToBeDealt: number = (this.currentShoe.getNumOfDecks() * 40)
    for (let i = 0; i < numOfCardsToBeDealt; i++)  {
      if (this.userTerminated)  {
        return;
      }
      await delay(500);
      this.dealNextCard();
    }
    await delay(1000);
    this.card_image = getCardCover(this.image_file_path);
    this.displayRunningCount();
    // delete current deck

  }

  async createNewDeck()  {
    this.userTerminated = true;
    await delay(500);
    this.runningCountDisplay = "";
    const beginButton = document.getElementById('BeginButton') as HTMLButtonElement | null;
    const newDeckButton = document.getElementById('newDeckButton') as HTMLButtonElement | null;
    beginButton?.removeAttribute('disabled');
    newDeckButton?.setAttribute('disabled', '');

    this.card_image = getCardCover(this.image_file_path);
    this.currentShoe = new Shoe(this.numOfDecks);
    this.userTerminated = false;

  }

  private dealNextCard(): void  {
    this.currentShoe.nextCard();
    this.card_image = this.image_file_path + this.currentShoe.getCardImageUrl();
    this.runningCount = this.currentShoe.getRunningCount();
  }

  private displayRunningCount(): void  {
    this.runningCountDisplay = "Running Count is: " + this.runningCount.toString();
  }

  private disableButton(b: any)  {
    b?.setAttribute('disabled','');
  }
}


function getCardCover(image_file_path: string): string  {
  return image_file_path + "card_images/PlayingCard_0_cover.GIF";
}

function delay(ms: number)  {
  return new Promise(resolve => {setTimeout(resolve, ms);
  });
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
  private currentIndex: number;
  private cardStack: Card[] = [];

  public constructor(numOfDecks: number)  {
    this.runningCount = 0;
    this.currentIndex = 0;
    this.numOfDecks = numOfDecks;
    this.cardStack = createShuffledCardStack(numOfDecks);
  }

  public nextCard(): void  {
    this.currentIndex++;
    this.adjustRunningCount()
  }

  public getRunningCount(): number  {
    return this.runningCount;
  }

  public getNumOfDecks(): number  {
    return this.numOfDecks;
  }

  public getCardImageUrl(): string  {
    return this.cardStack[this.currentIndex].getCardImageUrl();
  }

  private adjustRunningCount(): void  {

    if (isHighCard(this.cardStack[this.currentIndex].getCardValue()))  {
      this.runningCount--;
    }
    else if (isLowCard(this.cardStack[this.currentIndex].getCardValue()))  {
      this.runningCount++;
    }
    else if (isNeutralCard(this.cardStack[this.currentIndex].getCardValue())) {
      this.runningCount += 0;
    }
    else  {
      throw "card has invalid suit assignment";
    }
  }

}

function isHighCard(s: string): boolean  {
  if ((s == "T") || (s == "J") || (s == "Q") || (s == "K") || (s == "A"))  {
    return true;
  }
  return false;
}

function isLowCard(s: string): boolean  {
  if ((s == "2") || (s == "3") || (s == "4") || (s == "5") || (s == "6"))  {
    return true;
  }
  return false;
}

function isNeutralCard(s: string): boolean  {
  if ((s == "7") || (s == "8") || (s == "9"))  {
    return true;
  }
  return false;
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
      // value and suit are used to identify appropriate image in file 'card_images'
      cardStack.push(new Card((j).toString(), "S", "card_images/PlayingCard_" + (j).toString() + 'S' + ".GIF"))
      cardStack.push(new Card((j).toString(), "H", "card_images/PlayingCard_" + (j).toString() + 'H' + ".GIF"))
      cardStack.push(new Card((j).toString(), "D", "card_images/PlayingCard_" + (j).toString() + 'D' + ".GIF"))
      cardStack.push(new Card((j).toString(), "C", "card_images/PlayingCard_" + (j).toString() + 'C' + ".GIF"))
    }
  
    let faceCards: string[] = ["T", "J", "Q", "K", "A"] // value of 10 is included in faceCards[] as 'T'

    for (let j = 0; j < 5; j++)  {
      // value and suit are used to identify appropriate image in file 'card_images'
      cardStack.push(new Card(faceCards[j], "S", "card_images/PlayingCard_" + faceCards[j] + 'S' + ".GIF"))
      cardStack.push(new Card(faceCards[j], "H", "card_images/PlayingCard_" + faceCards[j] + 'H' + ".GIF"))
      cardStack.push(new Card(faceCards[j], "D", "card_images/PlayingCard_" + faceCards[j] + 'D' + ".GIF"))
      cardStack.push(new Card(faceCards[j], "C", "card_images/PlayingCard_" + faceCards[j] + 'C' + ".GIF"))
      
    }
  }
  return cardStack;
}
