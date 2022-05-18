import {
  AttachMoney,
  BarChart,
  DynamicFeed,
  LineStyle,
  MailOutline,
  PermIdentity,
  Report,
  Storefront,
  TrendingUp,
  WorkOutline,
  PersonAdd
} from '@material-ui/icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

export default function Sidebar() {
  const [isActive, setIsActive] = useState(-1)
  const sideBar = [
    {
      id: 1,
      linkTo: '/users',
      nameIcon: 'PermIdentity',
      nameLink: 'Tài khoản',
    },
    {
      id: 2,
      linkTo: '/products',
      nameIcon: 'WorkOutline',
      nameLink: 'Sản phẩm',
    },
    { id: 3, linkTo: '/orders', nameIcon: 'MailOutline', nameLink: 'Đơn hàng' },
    { id: 4, linkTo: '/ghtk', nameIcon: 'MailOutline', nameLink: 'GHTK' },
    {
      id: 5,
      linkTo: '/promotions',
      nameIcon: 'TrendingUp',
      nameLink: 'Khuyến mãi',
    },
    { id: 6, linkTo: '/rankList', nameIcon: 'Storefront', nameLink: 'Ranks' },
    { id: 7, linkTo: '/requests', nameIcon: 'BarChart', nameLink: 'Yêu cầu' },
    { id: 8, linkTo: '/transactions', nameIcon: 'AttachMoney', nameLink: 'Ví' },
    { id: 9, linkTo: '/reports', nameIcon: 'Report', nameLink: 'Báo cáo' },
    { id: 10, linkTo: '/create-site', nameIcon: 'TrendingUp', nameLink: 'Tạo site' },
    { id: 11, linkTo: '/whishlist', nameIcon: 'TrendingUp', nameLink: 'Yêu thích' },
    { id: 12, linkTo: '/products-enable', nameIcon: 'TrendingUp', nameLink: 'Bật SP' },
    //2022/04/12 Huynh-dt add create-account start
    { id: 13, linkTo: '/create-account', nameIcon: 'PersonAddAlt', nameLink: 'Tạo tài khoản' },
    //2022/04/12 Huynh-dt add create-account start
  ]
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={isActive === -1 ? 'sidebarListItem active' : 'sidebarListItem'}
                onClick={() => setIsActive(-1)}
              >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            {sideBar.map((value, index) => (
              <Link to={value.linkTo} className="link">
                <li
                  className={isActive === index ? 'sidebarListItem active' : 'sidebarListItem'}
                  onClick={() => setIsActive(index)}
                >
                  {value.nameIcon === 'PermIdentity' ? (
                    <PermIdentity className="sidebarIcon" />
                  ) : value.nameIcon === 'WorkOutline' ? (
                    <WorkOutline className="sidebarIcon" />
                  ) : value.nameIcon === 'Storefront' ? (
                    <Storefront className="sidebarIcon" />
                  ) : value.nameIcon === 'MailOutline' ? (
                    <MailOutline className="sidebarIcon" />
                  ) : value.nameIcon === 'TrendingUp' ? (
                    <TrendingUp className="sidebarIcon" />
                  ) : value.nameIcon === 'BarChart' ? (
                    <BarChart className="sidebarIcon" />
                  ) : value.nameIcon === 'AttachMoney' ? (
                    <AttachMoney className="sidebarIcon" />
                  ) : value.nameIcon === 'PersonAddAlt' ? (
                    <PersonAdd className="sidebarIcon" />
                  ): (
                    <Report className="sidebarIcon" />
                  )}
                  {value.nameLink}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <Link to="/settings" className="link">
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                Settings
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}
