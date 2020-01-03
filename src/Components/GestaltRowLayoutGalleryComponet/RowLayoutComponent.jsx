import React from 'react';
import './RowLayoutComponent.css';
import jsonp from 'jsonp';
import RowLayoutGalleryComponent from './RowLayoutGalleryComponent';
import InfiniteScroll from "react-infinite-scroll-component"

class RowLayoutComponent extends React.Component {
  constructor() {
    super();
    this.state = { 
      width: -1,
      items: Array.from({ length: 1 }),
      t: 30
     };
    this.loadPhotos = this.loadPhotos.bind(this);
  }
  componentDidMount() {
    this.loadPhotos();
  }
  loadPhotos() {
    setTimeout(() => {
      const urlParams = {
        api_key: '455b5e2fa6b951f9b9ab58a86d5e1f8a',
        photoset_id: '72157708141247864',
        user_id: '146659101@N08',
        format: 'json',
        per_page: '120',
        extras: 'url_m,url_c,url_l,url_h,url_o',
      };
  
      let url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos';
      url = Object.keys(urlParams).reduce((acc, item) => {
        return acc + '&' + item + '=' + urlParams[item];
      }, url);
  
      jsonp(url, { name: 'jsonFlickrApi' }, (err, data) => {
        let photos = data.photoset.photo.map(item => {
          let aspectRatio = parseFloat(item.width_o / item.height_o);
          return {
            src: item.url_l,
            width: parseInt(item.width_o),
            height: parseInt(item.height_o),
            title: item.title,
            alt: item.title,
            key: item.id,
            srcSet: [
              `${item.url_m} ${item.width_m}w`,
              `${item.url_c} ${item.width_c}w`,
              `${item.url_l} ${item.width_l}w`,
              `${item.url_h} ${item.width_h}w`,
            ],
            sizes: '(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw',
          };
        });
        
        this.setState({
          photos: this.state.photos ? this.state.photos.concat(photos) : photos,
          items: this.state.items.concat(Array.from({ length: 1 })),
        });
      });
    }, 150);
    
  }

  render() {
    if (this.state.photos) {
      const width = this.state.width;
      return (
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.loadPhotos}
          hasMore={true}
          loader={<div className = "loading-msg">Loading</div>}
        >
          {this.state.items.map((i, index) => (
            <RowLayoutGalleryComponent photos={this.state.photos.slice(index*this.state.t, index*this.state.t + this.state.t)} />
          ))}
        </InfiniteScroll>
        
      );
    } else {
      return (
        <div className="RowLayoutComponent">
          <div id="msg-RowLayoutComponent-loading" className="loading-msg">
            Loading
          </div>
        </div>
      );
    }
  }
}

export default RowLayoutComponent;
