import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import {Button} from 'vant';
import { NavBar } from 'vant';
import { Tabbar, TabbarItem,Icon } from 'vant';
import router from "./routers/router";
import { Search } from 'vant';
import { PullRefresh } from 'vant';
import 'vant/lib/index.css'
import { Skeleton } from 'vant';
import { Card } from 'vant';
import { Field, CellGroup } from 'vant';
import { List } from 'vant';
import { Form } from 'vant';
import { Sticky } from 'vant';
import { Lazyload } from 'vant';
import { Divider } from 'vant';
import { Space } from 'vant';
import { Circle } from 'vant';
import { Col, Row } from 'vant';
import { ActionSheet } from 'vant';
import { Dialog } from "vant"
const app = createApp(App);
app.use(Dialog).use(Lazyload).use(Divider).use(Space).use(Circle).use(List).use(Col).use(Row)
    .use(Sticky).use(Field).use(Form).use(CellGroup).use(Card).use(Skeleton)
    .use(PullRefresh).use(Search).use(router).use(NavBar).use(Button).use(Icon)
    .use(Tabbar).use(TabbarItem).use(ActionSheet)

app.mount('#app')
