import { NgModule, Component, enableProdMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import {
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxContextMenuModule
} from "devextreme-angular";

import { Service, Sale } from "./app.service";

@Component({
  selector: "demo-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [Service],
  preserveWhitespaces: true
})
export class AppComponent {
  sales: Sale[];
  allMode: string;
  checkBoxesMode: string;
  grid: any;
  selectAll: boolean = false;
  items: any;

  constructor(service: Service) {
    this.sales = service.getSales();
    this.allMode = "allPages";
    this.checkBoxesMode = "onClick";

    this.items = [
      {
        text: "All"
      },
      {
        text: "Country = 'Canada'"
      },
      {
        text: "Amount < 1000"
      }
    ];
  }

  onInitialized(e) {
    this.grid = e.component;
  }

  onValueChanged(e) {
    if (e.value === true) {
      this.grid.selectAll();
    } else if (e.value === false) {
      this.grid.deselectAll();
    }
  }

  onItemClick(e) {
    if (e.itemData.text === "All") {
      this.grid.selectAll();
      this.selectAll = true;
    } else if (e.itemData.text === "Country = 'Canada'") {
      this.grid
        .getDataSource()
        .store()
        .load({
          filter: ["country", "Canada"]
        })
        .then((result) => {
          var keys = result.map((data) => data.orderId);
          this.grid.selectRows(keys);
          this.selectAll = undefined;
        });
    } else if (e.itemData.text === "Amount < 1000") {
      this.grid
        .getDataSource()
        .store()
        .load({
          filter: ["amount", "<", 1000]
        })
        .then((result) => {
          var keys = result.map((data) => data.orderId);
          this.grid.selectRows(keys);
          this.selectAll = undefined;
        });
    }
  }

  onSelectionChanged(e) {
    if (e.selectedRowKeys.length === e.component.totalCount()) {
      this.selectAll = true;
    } else if (e.selectedRowKeys.length === 0) {
      this.selectAll = false;
    } else {
      this.selectAll = undefined;
    }
  }
}

@NgModule({
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxContextMenuModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
