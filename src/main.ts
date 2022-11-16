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
const app = createApp(App);
app.use(Lazyload).use(Divider).use(Space).use(Circle).use(List)
app.use(Sticky);
app.use(Field);
app.use(Form);
app.use(CellGroup);
app.use(Card);
app.use(Skeleton);
app.use(PullRefresh);
app.use(Search);
app.use(router);
app.use(NavBar);
app.use(Button);
app.use(Icon)
app.use(Tabbar);
app.use(TabbarItem);
app.mount('#app')
