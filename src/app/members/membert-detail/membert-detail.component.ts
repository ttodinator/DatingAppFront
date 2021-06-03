import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-membert-detail',
  templateUrl: './membert-detail.component.html',
  styleUrls: ['./membert-detail.component.css']
})
export class MembertDetailComponent implements OnInit {
  @ViewChild('memberTabs',{static:true}) memberTabs:TabsetComponent;
  member:Member;
  galleryOptions:NgxGalleryOptions[];
  galleryImages:NgxGalleryImage[];
  activeTab:TabDirective;
  messages:Message[]=[];

  constructor(private memberService:MembersService,private route:ActivatedRoute,private messageService:MessageService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.member=data.member;
    })

    this.route.queryParams.subscribe(params=>{
      params.tab ? this.selectTab(params.tab):this.selectTab(0)
    })

    this.galleryOptions=[
      {
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation:NgxGalleryAnimation.Slide,
        preview:false
      }
    ]

    this.galleryImages=this.getImages();
  }

  getImages():NgxGalleryImage[]{
    const imageUrls=[];
    for(const photo of this.member.photos){
      imageUrls.push({
        small:photo?.url,
        medium:photo?.url,
        big:photo?.url,
      })
    }
    return imageUrls;
  }


  loadMessages(){
    this.messageService.getMessageThread(this.member.username).subscribe(messages=>{
      this.messages=messages;
    })
  }

  selectTab(tabId:number){
    this.memberTabs.tabs[tabId].active=true;
  }

  onTabActivated(data:TabDirective){
    this.activeTab=data;
    if(this.activeTab.heading==='Messages' && this.messages.length===0){
      this.loadMessages();
    }
  }

}