import React, { useState } from 'react';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel/AdminPanel';
import styles from './App.module.scss';
import { connect } from 'react-redux';
import { IAppState } from './store/state';
import { IUser } from './classes/models/IUser';
import { getUser } from './classes/helpers/StorageHelper';
import { isEmpty } from './classes/utils/Checker';
import {appUpdateState} from "./store";

interface IProps {
  currentUser: IUser;
}

const App = (props: IProps) => {
  const [user, setUser] = useState<IUser | undefined>(
    getUser().length > 0 ? JSON.parse(getUser()) : undefined
  );
  const [isAuth, setAuth] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (getUser().length > 0) {
      setUser(JSON.parse(getUser()));
      setAuth(true);
      appUpdateState(s => {
        s.currentUser = JSON.parse(getUser());
      });
    }
    if (!isEmpty(props.currentUser)) {
      setUser(props.currentUser);
      setAuth(true);
    }
  }, []);
  return (
    <>
      {isAuth ? (
        <AdminPanel currentUser={user} logout={() => {setAuth(false)}}/>
      ) : (
        <div className={styles.App}>
          <Auth setAuth={() => setAuth(true)} />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: IAppState): IProps => ({
  currentUser: state.app.currentUser,
});

const AppConnected = connect(mapStateToProps)(App);
export default AppConnected;
