import { LightningElement, api , track } from 'lwc';
import { produce} from 'services/sampleData';

export default class YadDataTableSingleSelect extends LightningElement {
    @track data = [];
    @track selectedRows;
    pagesize = 7;
    pagelimit = 5;
    currentPage = 0;
    totalNumberOfPages;
    currentPageIndex = 0;
    yes=true;
    dataColumns = [
        {
            "fieldName": "id",
            "label": "id",
            "searchable": false,
            "sortable": true,
            "type": "text",
            "hideDefaultActions": true
        },
        {
            "fieldName": "type",
            "label": "type",
            "searchable": false,
            "sortable": true,
            "type": "text",
            "hideDefaultActions": true
        },
        {
            "fieldName": "title",
            "label": "title",
            "searchable": false,
            "sortable": true,
            "type": "text",
            "hideDefaultActions": true
        },
        {
            "fieldName": "height",
            "label": "height",
            "searchable": false,
            "sortable": true,
            "type": "text",
            "hideDefaultActions": true
        },
        {
            "fieldName": "width",
            "label": "width",
            "searchable": false,
            "sortable": true,
            "type": "text"
        },
        {
            "fieldName": "price",
            "label": "price",
            "searchable": false,
            "sortable": true,
            "type": "text"
        },
        {
            "fieldName": "rating",
            "label": "rating",
            "searchable": false,
            "sortable": true,
            "type": "text"
        }
    ]
    // v = "3a";
    v="c18";
 
    connectedCallback() {
        this.selectedRows = this.v.split(",");
        this.records = produce;
        this.getPageData();
    }

    getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        if(selectedRows.length) console.log("You have selected",selectedRows[0].title )
    }

    getPageData() {
        this.totalNumberOfPages = Math.ceil(this.records.length / this.pagesize);
        this.data = [...this.records.slice(this.currentPage * this.pagesize, (this.currentPage + 1) * this.pagesize)];
        this.selectedRows = [...this.selectedRows];
    }

    get range(){
        let _range =[];
        let _pagelimit = parseInt(this.pagelimit, 10);
        let start = this.currentPage;
        let end = start + ( _pagelimit > this.totalNumberOfPages ? this.totalNumberOfPages : _pagelimit);
        if(end > this.totalNumberOfPages) {
            end = this.totalNumberOfPages;
            start = end - _pagelimit;
        } 
        if(start < 0) {
            start = 0; 
            end = ( _pagelimit > this.totalNumberOfPages ? this.totalNumberOfPages : _pagelimit);
        }              

        for(let i= start; i < end; i++){
            _range.push(Object.assign({
                counter: i + 1,
                status: (i == this.currentPage ?  'slds-button slds-button--brand' : 'slds-button slds-button--neutral')
            }));
        }
        return _range;
    }

    goToPage(evt){
        let c = evt.target.dataset.index;
        if(!evt.target.disabled) {
            switch(c) {
                case 'next': 
                    this.currentPage++;
                    break;
                case 'prev':
                    this.currentPage--;
                    break;
                default:      
                    this.currentPage = parseInt(c, 10) - 1;
            }
            this.getPageData();
        }
    }
    
    get prevDisabled() {
        return this.currentPage === 0;
    }
    
    get nextDisabled() {
        return this.currentPage + 1 === this.totalNumberOfPages;
    }
}