import React, { useEffect, useState } from "react";
import { API } from "../../../api";

function StudentReviewHomePage() {
  const [fetchedReviews, setFetchedReviews] = useState([]);
  useEffect( () => {

(async () => 
{

  
  setFetchedReviews((await API.get("/review/getReviews")).data);
}
)()
  }, []);
  return <section id="testimonial">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="section-title">
              <h2>
                Student Reviews <small>from around the world</small>
              </h2>
            </div>
            <div className="owl-carousel owl-theme owl-client">{reviews()}</div>
          </div>
        </div>
      </div>
    </section>;

  function reviews() {
    return fetchedReviews.map((review, key) => <div key={key} className="col-md-4 col-sm-4">
        <div className="item">
          <div className="tst-image">
            <img src="assets/images/inconnue.jpg" className="img-responsive" alt="" />
          </div>
          <div className="tst-author">
            <h4>{review?.studentId?.username} </h4>
          </div>
          <div className="tst-rating">
            {[...Array(review.rating)].map((e, i) => <i key={i} className="fa fa-star"></i>)}
          </div>
        </div>
      </div>);
  }
}

export default StudentReviewHomePage;