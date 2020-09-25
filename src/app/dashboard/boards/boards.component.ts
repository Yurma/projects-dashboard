import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Task} from 'protractor/built/taskScheduler';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  currentItemIndex: number;
  title = 'angular-boards';
  listAdd = false;
  lists = [
    {
      title: 'To-Do',
      isEditing: false,
      itemEdit: null,
      itemAdd: false,
      items: [
        {
          content: 'One',
          labels: [
            'Frontend'
          ]
        },
        {
          content: 'Two',
          labels: [
            'Backend'
          ]
        }
      ]
    },
    {
      title: 'In progress',
      isEditing: false,
      itemEdit: null,
      itemAdd: false,
      items: [
        {
          content: 'Three',
          labels: [
            'Frontend',
            'Javascript'
          ]
        }
      ]
    },
    {
      title: 'Complete',
      isEditing: false,
      itemEdit: null,
      itemAdd: false,
      items: [
        {
          content: 'Four',
          labels: [
            'Backend',
            'ExpressJs'
          ]
        },
        {
          content: 'Five',
          labels: [
            'Frontend',
            'Javascript'
          ]
        }
      ]
    }
  ];

  constructor(private authService: AuthService) {
    this.lists = authService.boardsArray;
  }

  getConnectedList(): any[] {
    return this.lists.map((x, id) => `${id}`);
  }


  ngOnInit() {

  }

  overItem(id) {
    this.currentItemIndex = id;
  }

  setItemEdit(listId, itemId) {
    this.lists[listId].itemEdit = itemId;
  }

  cancelItemEdit(listId) {
    this.lists[listId].itemEdit = null;
  }

  setItemAdd(listId) {
    this.lists[listId].itemAdd = true;
  }

  cancelItemAdd(listId) {
    this.lists[listId].itemAdd = false;
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container){
      moveItemInArray(this.lists[event.container.id].items[this.currentItemIndex], event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.authService.saveBoards(this.lists);
  }

  onDropList(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
    this.authService.saveBoards(this.lists);
  }

  stringToList(labels: string){
    const list = labels.split(/(?:,| )+/).filter(x => x !== '');
    return list;
  }

  editItem(listId: number, itemId: number, labels: any, content: string) {
    const item = this.lists[listId].items[itemId];
    item.labels = this.stringToList(labels);
    item.content = content;
    this.lists[listId].items[itemId] = item;
    this.lists[listId].itemEdit = null;
    this.authService.saveBoards(this.lists);
  }

  addItem(listId: number, labels: any, content: string) {
    this.lists[listId].items.push(
      {
        content,
        labels: this.stringToList(labels)
      }
    );

    this.lists[listId].itemAdd = false;
    this.authService.saveBoards(this.lists);
  }

  addList(title: string) {
    this.lists.push(
      {
        title,
        isEditing: false,
        itemEdit: null,
        itemAdd: false,
        items: []
      }
    );

    this.listAdd = false;
    this.authService.saveBoards(this.lists);
  }


}
