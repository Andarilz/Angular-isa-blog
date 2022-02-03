import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {PostService} from '../shared/post.service';
import {Post} from '../shared/interfaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>;


  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    this.post$ = this.route.params
        .pipe(switchMap((params: Params) => {// получаем айдишник
          return this.postService.getById(params.id);
        }));
  }

}
