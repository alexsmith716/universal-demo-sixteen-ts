import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';

export class Home extends Component {

  render() {

    const styles = require('./scss/Home.scss');

    return (

      <div>

        <Helmet title="Home" />

        <header className={styles.masthead}>

          <div className="container">

            <h1>App 2020</h1>

            <h2 className="font-tester-font2">The Primary is right around the corner!</h2>

            <div className={styles.blurb}>What are you and others saying?</div>

            <div className={styles.blurbElipsis}>... join the conversation.</div>

            <div>

              <a className="btn btn-primary btn-lg" role="button" href="#">Sign Up Now »</a>

            </div>

          </div>

        </header>

        <div className="container">

          <div className="row my-4">

            <div className="col-lg-4 mb-4">
              <div className="card h-100">
                <h4 className="card-header">Card Title 1</h4>
                <div className="card-body">
                  <p className="card-text">Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">View details »</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="card h-100">
                <h4 className="card-header">Card Title 2</h4>
                <div className="card-body">
                  <p className="card-text colorPurpleGlobal">Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">View details »</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="card h-100">
                <h4 className="card-header">Card Title 3</h4>
                <div className="card-body">
                  <p className="card-text">Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper.Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Quos quisquam, error quod sed cumque, odio distinctio velit nostrum temporibus necessitatibus</p>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">View details »</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
