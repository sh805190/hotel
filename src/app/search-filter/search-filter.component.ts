import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomSearchService } from '../models/room-search.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {
//Student Name: Agbola Iseoluwatobi
//Student ID: B00802526

  public menuItem:string;
  //the constructor sets the Room Search Service 
  constructor(public search : RoomSearchService,public router : Router) { 
    
  }

  // The variables are set
  public Tag:string;
  public Ratings:string;
  public Locations:string;
  public priceRange:string;
  public roomSize:string;
  public numberOfBeds:string;
  public query = {};
  public Ratings_Data:any;
  public Locations_Data:any;
  public priceRange_Data:any;
  public Beds_Data:any;
  public RoomSize_Data:any;
  objectKeys = Object.keys;

  ngOnInit() {
    //this sets all default values and calls default functions 
    this.menuItem = "All";
    this.getData();
    this.checkSession();
  }
  //this checks if a search query combination is stored in session storage
  //is also sets the queries to the stored queries
  checkSession(){
    let data = sessionStorage.getItem('searchData');
    if(data){
      var sessionData = JSON.parse(data);
      this.Ratings = sessionData["Ratings"];
      this.Locations = sessionData["Locations"];
      this.priceRange = sessionData["price_range"];
      this.roomSize = sessionData["Room Sizes"];
      this.numberOfBeds= sessionData["numberOfBeds"];
    }
    
  }

  // this gets default field data values from the cloud storage
  getData(){
    this.Tag = "Tags";
    this.Ratings = "All Ratings"
    this.Locations = "All Locations";
    this.priceRange = "All Price Ranges";
    this.roomSize = "All Room Sizes";
    this.numberOfBeds= "All Bed Sizes";
    
    this.Ratings_Data = this.search.getAllRatings();
    this.Locations_Data = this.search.getAllLocations();
    this.priceRange_Data = this.search.getPriceRange();
    this.Beds_Data = this.search.getAllBeds();
    this.RoomSize_Data = this.search.getAllSizes();
  }

  //this sets new values when the user makes a change 
  changeValue(input_type,value){
    if(input_type=="Bed Sizes"){
      this.numberOfBeds = value;
    }else if(input_type=="Room Size"){
      this.roomSize = value
    }else if(input_type=="Ratings"){
      this.Ratings = value;
    }else if(input_type=="location"){
      this.Locations = value;
    }
  }
  
  // this submits the query to the new page stores the data that will be used to query the database
  submit(){
    this.query["Ratings"]=this.Ratings;
    this.query["Locations"]=this.Locations;
    this.query["numberOfBeds"]=this.numberOfBeds;
    this.query["price_range"]=this.priceRange;
    this.query["price_data"]=this.priceRange_Data[this.priceRange];
    this.query["Room Sizes"]=this.roomSize;
    sessionStorage.setItem("searchData", JSON.stringify(this.query));
    window.location.href = "/search";
  }
}
