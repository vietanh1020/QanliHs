import SvHome from '~/pages/Home';
import Login from '~/pages/Login';
import Admin from '~/pages/Admin';
import SidebarLayout from '~/Layout/SidebarLayout';
import QuanLiHP from '~/components/QuanLiHP';
import QuanLiSV from '~/components/QuanLiSV';
import BangDiemLopHoc from '~/pages/BangDiemLopHoc';
import BangDiemSV from '~/pages/BangDiemSV';
import BangDiemHp from '~/components/BangDiemHP';
const datalistmenu = [
    {
        title: 'Tra cứu điểm',
        to: '##',
    },
    {
        title: 'Xem lịch học',
        to: '#ff',
    },
];
const privateRoutes = [
    { path: '/', component: SvHome, layout: SidebarLayout },
    { path: '/course/:id', component: BangDiemLopHoc, layout: SidebarLayout },
    { path: '/sinh-vien/:id', component: BangDiemSV, layout: SidebarLayout },
    { path: '/admin/score/:id', component: BangDiemHp, layout: SidebarLayout },
    { path: '/login', component: Login },
    { path: '/admin', component: Admin, layout: SidebarLayout, childrenlayout: datalistmenu },
    { path: '/admin/qlsv', component: QuanLiSV, layout: SidebarLayout },
    { path: '/admin/qlhp', component: QuanLiHP, layout: SidebarLayout },
];

const publicRoutes = [{ path: '/login', component: Login }];

export { privateRoutes, publicRoutes };
