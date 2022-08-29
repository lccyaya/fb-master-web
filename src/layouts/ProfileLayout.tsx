import { Layout, Menu, MenuProps } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [getItem('创作中心', '1')];

const ProfileLayout: React.FC = (props) => {

  const {
    children,
  } = props;

  return (
    <>
      <Layout style={{height: '100%', minHeight: '100%'}}>
        <Sider>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
          />
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </>
  );
};

export default ProfileLayout;
