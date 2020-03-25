import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StoriesService } from '../../providers/stories/stories';

declare var window:any;

/*
  Generated class for the CommentsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/comments/comments.html',
  providers: [StoriesService]
})
export class CommentsPage {

  comments: any[];

  constructor(private nav: NavController, private navParams: NavParams, private storiesService: StoriesService) {
    this.comments = [];
  }

  ionViewDidEnter() {

    window.One.sendInteraction("/GetCommentsPage",{key:"value"}, function(response:any) {console.log("Success!");},function(error:any) {console.log(error);});
    window.One.sendProperties("/GetCommentsPage",{commentPageKey:"commentPageValue"});

    let data = this.navParams.get('data');
    data.forEach((id: any) => {
      this.storiesService.getStory(id)
        .subscribe(
          data => {
            console.log(data);
            this.comments.push(data);
          },
          error => {
            console.log(error);
          }
        );
    });
  }

}
