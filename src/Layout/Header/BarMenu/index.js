import { useNavigate } from 'react-router-dom';
import styles from './BarMenu.module.scss';
import classNames from 'classnames/bind';
import { useCookies } from 'react-cookie';

const cx = classNames.bind(styles);

function BarMenu({ data }) {
    const [cookie, setCookie, removeCookie] = useCookies(['user']);

    const navigate = useNavigate();
    return (
        <div className={cx('box-menu')}>
            <ul>
                <li>
                    <a href="/">Trang chủ</a>
                </li>
                <li>
                    {cookie.user && (
                        <div
                            onClick={async () => {
                                await removeCookie('user');
                                navigate('/login');
                            }}
                        >
                            Đăng Xuất
                        </div>
                    )}
                    {!cookie.user && <a href="/">Đăng nhập</a>}
                </li>
            </ul>
        </div>
    );
}

export default BarMenu;
