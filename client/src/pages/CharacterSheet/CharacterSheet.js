import React from 'react';
import './CharacterSheet.scss'

function CharacterSheet() {
  return <div className='sheet'>
      <Hp />
  </div>;
}

export default CharacterSheet;

function Hp() {
    return <div className='sheet__hp'>

    </div>
}