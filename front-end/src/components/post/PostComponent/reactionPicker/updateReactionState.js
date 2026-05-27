
/*
  this function is used to update the state of the reactions
*/ 

export const updateReactionState = (setPostReactions, oldReactionId, newReactionId) => {

  setPostReactions(prev => {
    let totalCount = prev?.totalCount || 0;
    let topReactions = prev?.topReactions ? [...prev.topReactions] : [];

    // if there is an old reaction remove it
    if (oldReactionId) {
      totalCount -= 1;
      const oldIndex = topReactions.findIndex(r => r.reaction === oldReactionId);
      if (oldIndex !== -1) {
        topReactions[oldIndex] = { ...topReactions[oldIndex], count: topReactions[oldIndex].count - 1 };
        if (topReactions[oldIndex].count <= 0) {
          topReactions.splice(oldIndex, 1);
        }
      }
    }

    // if there is a new reaction add it
    if (newReactionId) {
      totalCount += 1;
      const newIndex = topReactions.findIndex(r => r.reaction === newReactionId);
      if (newIndex !== -1) {
        topReactions[newIndex] = { ...topReactions[newIndex], count: topReactions[newIndex].count + 1 };
      } else {
        topReactions.push({ reaction: newReactionId, count: 1 });
      }
    }

    // sort reactions by count
    topReactions.sort((a, b) => b.count - a.count);

    // return new state
    return {
      ...prev,
      totalCount,
      topReactions: topReactions.slice(0, 3),
      myReaction: newReactionId || "None"
    };
  });
};
