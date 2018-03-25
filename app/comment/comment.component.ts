import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { TextField } from 'ui/text-field';
import { Slider } from 'ui/slider';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Comment } from '../shared/comment';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
    selector: 'app-comment',
    moduleId: module.id,
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {

    addComment: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private vcRef: ViewContainerRef,
        private params: ModalDialogParams) {

            this.addComment = this.formBuilder.group({
                author: ['', Validators.required],
                rating: [5, Validators.required],
                comment: ['', Validators.required]
            });
    }

    ngOnInit() {

    }

    onAuthorChange(args) {
        let textField = <TextField>args.object;

        this.addComment.patchValue({ author: textField.text});
    }

    onCommentChange(args) {
        let textField = <TextField>args.object;

        this.addComment.patchValue({ comment: textField.text});
    }

    onRatingChange(args) {
        let slider = <Slider>args.object;

        this.addComment.patchValue({ rating: slider.value});
    }

    Submit() {
        let newComment: Comment;
          newComment = this.addComment.value;
          newComment.date = new Date().toISOString();
        this.params.closeCallback(newComment);
        
    }
}