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