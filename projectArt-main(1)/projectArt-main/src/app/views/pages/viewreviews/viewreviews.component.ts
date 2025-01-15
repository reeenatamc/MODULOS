import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../../model/firebase.service';
import { AuthService } from '../../../model/auth.service';
import { Review } from '../../../interfaces/review.model';

@Component({
  selector: 'app-viewreviews',
  templateUrl: './viewreviews.component.html',
  styleUrls: ['./viewreviews.component.css']
})
export class ViewreviewsComponent implements OnInit {
  currentUser: any;
  reviews: Review[] = [];
  selectedReview: Review | null = null;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.loadReviews();
  }

  loadReviews(): void {
    this.firebaseService.getReviews().subscribe((reviews: Review[]) => {
      this.reviews = reviews;
      console.log(this.reviews);
    });
  }

  editReview(review: Review): void {
    this.selectedReview = { ...review };
  }

  saveReview(): void {
    if (this.selectedReview) {
      this.firebaseService.updateReview(this.selectedReview).then(() => {
        this.selectedReview = null;
        this.loadReviews();
      });
    }
  }

  cancelEdit(): void {
    this.selectedReview = null;
  }

  deleteReview(reviewId: string): void {
    this.firebaseService.deleteReview(reviewId).then(() => {
      this.loadReviews();
    });
  }

  toggleFullDescription(review: Review | null): void {
    this.selectedReview = review;
  }
}