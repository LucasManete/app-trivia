import React from 'react';
import './settings.css';

class Settings extends React.Component {
  render() {
    return (
      <div className="settingsPage">
        <p data-testid="settings-title" className="settings">Configurações do Jogo</p>
      </div>
    );
  }
}
export default Settings;
