import { useState } from 'react';
import { FiEdit2, FiTrash2, FiChevronRight } from 'react-icons/fi';
import { updatePost, deletePost } from '../../services/api';
import './Post.css';

const Post = ({ post, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [editedImageUrl, setEditedImageUrl] = useState(post.imageUrl);
  const [showActions, setShowActions] = useState(false);

  const handleUpdate = async () => {
    try {
      const updatedPost = await updatePost(post.id, { 
        content: editedContent,
        imageUrl: editedImageUrl
      });
      onUpdate(updatedPost);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this post?')) {
      try {
        await deletePost(post.id);
        onDelete(post.id);
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`post-card ${showActions ? 'show-actions' : ''}`}>
      <div className="post-main">
        <div className="post-header">
          <div className="user-avatar">
            {post.author.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="username">{post.author}</span>
            <span className="post-time">{formatDate(post.createdAt)}</span>
          </div>
        </div>

        <div className="post-content">
          {isEditing ? (
            <div className="edit-mode">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                autoFocus
                className="edit-textarea"
              />
              <input
                type="text"
                value={editedImageUrl || ''}
                onChange={(e) => setEditedImageUrl(e.target.value)}
                placeholder="Image URL"
                className="edit-input"
              />
              <div className="edit-buttons">
                <button 
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button 
                  className="save-button"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <p>{post.content}</p>
              {post.imageUrl && (
                <div className="post-image">
                  <img src={post.imageUrl} alt="Post content" />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="post-actions-panel">
        <div className="actions">
          <button 
            className="edit-button"
            onClick={() => {
              setIsEditing(true);
              setShowActions(false);
            }}
          >
            <FiEdit2 /> Edit
          </button>
          <button 
            className="delete-button"
            onClick={handleDelete}
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;