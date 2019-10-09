import { Component, ViewChild, ElementRef } from '@angular/core';
import { EsriModuleProvider } from 'angular-esri-components';
import { DragAndDropModule } from 'angular-draggable-droppable';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('test')
  test: ElementRef;

  title = 'app';

  mapProperties: __esri.MapProperties = {
    basemap: 'dark-gray'
  };
  mapViewProperties: __esri.MapViewProperties = {
    center: [-118, 34.5],
    zoom: 8
  };
  map: __esri.Map;
  mapView: __esri.MapView;

  constructor(private moduleProvider: EsriModuleProvider) { }
  onClick() {
    alert('hey');
  }
  onMapInit(mapInfo: {map: __esri.Map, mapView: __esri.MapView}) {
    this.map = mapInfo.map;
    this.mapView = mapInfo.mapView;

    

    // add a layer with sublayers to map
    this.moduleProvider
      .require(['esri/layers/MapImageLayer', 'esri/PopupTemplate', 'esri/layers/FeatureLayer'])
      .then(
        ([MapImageLayer, PopupTemplate, FeatureLayer]) => {
          const featureLayer = new FeatureLayer({
            url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Marital_Status_Boundaries/FeatureServer/2"
          });
        
          // var template = {
          //   // autocasts as new PopupTemplate()
          //   title: "{NAME} in {COUNTY}",
          //   content: [
          //     {
          //       type: "fields",
          //       fieldInfos: [
          //         {
          //           fieldName: "B12001_calc_pctMarriedE",
          //           label: "Married %"
          //         },
          //         {
          //           fieldName: "B12001_calc_numMarriedE",
          //           label: "People Married"
          //         },
          //         {
          //           fieldName: "B12001_calc_numNeverE",
          //           label: "People that Never Married"
          //         },
          //         {
          //           fieldName: "B12001_calc_numDivorcedE",
          //           label: "People Divorced"
          //         }
          //       ]
          //     }
          //   ]
          // };
          const template = {
            title: 'hey',
            content: this.test.nativeElement
          };
          featureLayer.popupTemplate = template;
          
          const layer = new MapImageLayer({
            url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer',
            sublayers: [
              {
                id: 3,
                title: 'States',
                visible: false
              },
              {
                id: 2,
                title: 'Railroads',
                visible: true
              },
              {
                id: 1,
                title: 'Highways',
                visible: true
              },
              {
                id: 0,
                title: 'Cities',
                visible: true
              }
            ]
          });

          this.map.layers.add(layer);
          this.map.layers.add(featureLayer);
        });
  }
}
