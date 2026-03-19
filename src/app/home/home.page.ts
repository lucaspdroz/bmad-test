import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonListHeader,
  IonTextarea,
  IonReorderGroup,
  IonReorder,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';

interface CardItem {
  id: string;
  text: string;
}

interface FolderItem {
  id: string;
  name: string;
  cards: CardItem[];
}

const STORAGE_KEY = 'ztalk-app-state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonList,
    IonListHeader,
    IonTextarea,
    IonReorderGroup,
    IonReorder,
    IonSelect,
    IonSelectOption,
    FormsModule,
  ],
})
export class HomePage {
  folders: FolderItem[] = [];
  selectedFolderId: string | null = null;
  newFolderName = '';
  newCardText = '';

  constructor() {
    this.loadState();
  }

  get selectedFolder(): FolderItem | undefined {
    return this.folders.find((f) => f.id === this.selectedFolderId);
  }

  persistState() {
    const state = {
      folders: this.folders,
      selectedFolderId: this.selectedFolderId,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      this.folders = [];
      this.selectedFolderId = null;
      return;
    }

    try {
      const state = JSON.parse(raw);
      this.folders = state.folders || [];
      this.selectedFolderId = state.selectedFolderId || (this.folders.length ? this.folders[0].id : null);
    } catch (err) {
      console.error('Error reading local storage state', err);
      this.folders = [];
      this.selectedFolderId = null;
    }
  }

  addFolder() {
    const name = this.newFolderName.trim();
    if (!name) {
      return;
    }

    const folder: FolderItem = {
      id: this.makeId(),
      name,
      cards: [],
    };

    this.folders.push(folder);
    this.newFolderName = '';
    this.selectedFolderId = folder.id;
    this.persistState();
  }

  promptRenameFolder(folder: FolderItem) {
    const newName = prompt('Enter folder name', folder.name);
    if (newName === null) return;
    const trimmed = newName.trim();
    if (!trimmed) return;
    folder.name = trimmed;
    this.persistState();
  }

  deleteFolder(folderId: string) {
    this.folders = this.folders.filter((f) => f.id !== folderId);
    if (this.selectedFolderId === folderId) {
      this.selectedFolderId = this.folders.length ? this.folders[0].id : null;
    }
    this.persistState();
  }

  selectFolder(folderId: string) {
    this.selectedFolderId = folderId;
    this.persistState();
  }

  addCard() {
    const targetFolder = this.selectedFolder;
    if (!targetFolder) {
      alert('Select a folder first.');
      return;
    }

    const text = this.newCardText.trim();
    if (!text) {
      return;
    }

    targetFolder.cards.push({
      id: this.makeId(),
      text,
    });

    this.newCardText = '';
    this.persistState();
  }

  editCard(card: CardItem) {
    const edited = prompt('Edit card text', card.text);
    if (edited === null) return;
    const trimmed = edited.trim();
    if (!trimmed) return;
    card.text = trimmed;
    this.persistState();
  }

  deleteCard(cardId: string) {
    const folder = this.selectedFolder;
    if (!folder) return;
    folder.cards = folder.cards.filter((c) => c.id !== cardId);
    this.persistState();
  }

  moveCard(cardId: string, targetFolderId: string) {
    const sourceFolder = this.selectedFolder;
    if (!sourceFolder) return;

    if (sourceFolder.id === targetFolderId) return;

    const cardIndex = sourceFolder.cards.findIndex((c) => c.id === cardId);
    if (cardIndex === -1) return;

    const card = sourceFolder.cards[cardIndex];
    sourceFolder.cards.splice(cardIndex, 1);

    const targetFolder = this.folders.find((f) => f.id === targetFolderId);
    if (!targetFolder) return;

    targetFolder.cards.push(card);
    this.persistState();
  }

  reorderFolders(event: any) {
    const item = this.folders.splice(event.detail.from, 1)[0];
    this.folders.splice(event.detail.to, 0, item);
    event.detail.complete();
    this.persistState();
  }

  reorderCards(event: any) {
    const folder = this.selectedFolder;
    if (!folder) {
      event.detail.complete();
      return;
    }
    const item = folder.cards.splice(event.detail.from, 1)[0];
    folder.cards.splice(event.detail.to, 0, item);
    event.detail.complete();
    this.persistState();
  }

  speakCard(card: CardItem) {
    const text = card.text;
    if (!text) {
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not available in this browser.');
    }
  }

  private makeId(): string {
    return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  }
}
