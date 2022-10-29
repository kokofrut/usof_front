import React, { useState } from 'react';


const Tag = ({ txt, idx, send, color }) => {
  const removeTag = () => { send(idx); }

  return <span className="tags has-addons">
    <span className="tag is-link" style={{ backgroundColor: color }}>{txt}</span>
    <span className="tag is-delete" onClick={removeTag}>&times;</span>
  </span>
}

export default function InputTags (props) {
  const { onTag, placeholder, color } = props;
  const [tags, setTags] = useState([])

  const addTag = (e) => {
    if (e.keyCode === 13) {
      const vals = [...tags, e.target.value];
      setTags(vals)
      onTag(vals)
      e.target.value = '';
    }
  }

  const getChildVal = (idx) => {
    setTags(tags.filter((_, i) => i !== idx));
  }

  return <div className="tag-container">
    {tags.map((t, i) => <Tag txt={t} send={getChildVal} key={t + i} idx={i} color={color} />)}
    <input
      className="input-tags"
      type="text"
      onKeyUp={addTag}
      placeholder={placeholder || ''}
      required
    />
  </div>;
}