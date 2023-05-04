import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface DirNode {
  name: string;
  children?: DirNode[];
}

const TREE_DATA: DirNode[] = [
  {
    name: 'tests',
    children: [
      { name: '__init__.py'},
      { name: 'conftest.py'},
      {
        name: 'functional',
        children: [{name: 'test_response_types.py'}],
      },
      {
        name: 'unit',
        children: [{name: 'test_pipelines.py'}, {name: 'test_records.py'}, {name: 'test_strategies.py'}],
      },
    ],
  },
];

@Component({
  selector: 'app-documentation-test-page',
  templateUrl: './documentation-test-page.component.html',
  styleUrls: ['./documentation-test-page.component.scss']
})
export class DocumentationTestPageComponent {

  treeControl = new NestedTreeControl<DirNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<DirNode>();

  constructor(
    public globalService: GlobalService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Documentación > Baterías de tests'
    })
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: DirNode) => !!node.children && node.children.length > 0;

}
