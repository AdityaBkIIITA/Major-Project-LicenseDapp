import React, { useState, useEffect } from 'react';
import { getCommentContract } from '../../utils/web3';
import 'bootstrap/dist/css/bootstrap.min.css';

function Comments({ sfId, rbId, licenseContract }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const commentContract = await getCommentContract();
        const allComments = [];
        let licenseIds;
        if (rbId !== undefined) {
          licenseIds = await licenseContract.methods.getLicensesForRB(rbId).call();
        } else if (sfId !== undefined) {
          licenseIds = await licenseContract.methods.getLicensesForSF(sfId).call();
        }
        if (licenseIds) {
          for (const licenseId of licenseIds) {
            const commentsForLicense = await commentContract.methods.getComments(licenseId).call();
            const formattedComments = commentsForLicense.map(comment => ({
              licenseId: licenseId,
              userId: comment.userId,
              comment: comment.text
            }));
            allComments.push(...formattedComments);
          }
          setComments(allComments);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    
    fetchComments();
  }, [sfId, rbId, licenseContract]);

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Reported Comments</h2>
      <table className="table">
        <thead className="table-dark">
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
