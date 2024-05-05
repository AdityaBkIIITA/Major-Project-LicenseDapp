import React, { useState, useEffect } from 'react';
import { getCommentContract } from '../../utils/web3';

function Comments({ licenseIds }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const commentContract = await getCommentContract();
        const allComments = [];
        for (const licenseId of licenseIds) {
          const commentsForLicense = await commentContract.methods.getComments(licenseId).call();
          const formattedComments = commentsForLicense.map(comment => ({
            licenseId: licenseId,
            userId: comment.userId,
            comment: comment.commentText
          }));
          allComments.push(...formattedComments);
        }
        setComments(allComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    if (licenseIds.length > 0) {
      fetchComments();
    }
  }, [licenseIds]);

  return (
    <div>
      <h2>Reported Comments</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">License ID</th>
            <th scope="col">User ID</th>
            <th scope="col">Comment</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => (
            <tr key={index}>
              <td>{comment.licenseId}</td>
              <td>{comment.userId}</td>
              <td>{comment.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Comments;
