import React, { createContext, useState, useContext } from 'react';
import { initialStartups, initialConnections, initialSuccessStories } from '../data/mockData';

const StartupsContext = createContext();

export function useStartups() {
  return useContext(StartupsContext);
}

export function StartupsProvider({ children }) {
  const [startups, setStartups] = useState(initialStartups);
  const [connections, setConnections] = useState(initialConnections);
  const [successStories, setSuccessStories] = useState(initialSuccessStories);

  // Add a new startup
  const addStartup = (newStartup) => {
    const id = (Math.max(...startups.map(s => parseInt(s.id)), 0) + 1).toString();
    const startupWithId = { 
      ...newStartup, 
      id,
      metrics: {
        before: {
          fundingRaised: newStartup.metrics.before.fundingRaised || 0,
          userGrowth: newStartup.metrics.before.userGrowth || 0,
          mediaMentions: newStartup.metrics.before.mediaMentions || 0
        },
        after: {
          fundingRaised: newStartup.metrics.after.fundingRaised || 0,
          userGrowth: newStartup.metrics.after.userGrowth || 0,
          mediaMentions: newStartup.metrics.after.mediaMentions || 0
        }
      }
    };
    setStartups([...startups, startupWithId]);
    return id;
  };

  // Get a startup by id
  const getStartupById = (id) => {
    return startups.find(startup => startup.id === id);
  };

  // Update a startup
  const updateStartup = (id, updatedData) => {
    setStartups(startups.map(startup => 
      startup.id === id ? { ...startup, ...updatedData } : startup
    ));
  };

  // Add a connection
  const addConnection = (newConnection) => {
    const id = (Math.max(...connections.map(c => parseInt(c.id)), 0) + 1).toString();
    const connectionWithId = { ...newConnection, id };
    setConnections([...connections, connectionWithId]);
    return id;
  };

  // Get connections for a startup
  const getConnectionsByStartupId = (startupId) => {
    return connections.filter(connection => connection.startupId === startupId);
  };

  // Get success stories for a startup
  const getSuccessStoriesByStartupId = (startupId) => {
    return successStories.filter(story => story.startupId === startupId);
  };

  // Generate a success story
  const generateSuccessStory = (startupId) => {
    const startup = getStartupById(startupId);
    if (!startup) return null;
    
    const startupConnections = getConnectionsByStartupId(startupId);
    
    // Simple success story generation based on data
    const fundingIncrease = startup.metrics.after.fundingRaised - startup.metrics.before.fundingRaised;
    const userGrowthPercent = Math.round((startup.metrics.after.userGrowth - startup.metrics.before.userGrowth) / startup.metrics.before.userGrowth * 100);
    const mediaMentionsIncrease = startup.metrics.after.mediaMentions - startup.metrics.before.mediaMentions;
    
    const id = (Math.max(...successStories.map(s => parseInt(s.id)), 0) + 1).toString();
    
    const keyPoints = [
      fundingIncrease > 0 ? `Secured additional $${(fundingIncrease / 1000000).toFixed(1)}M in funding` : null,
      userGrowthPercent > 0 ? `Grew user base by ${userGrowthPercent}%` : null,
      mediaMentionsIncrease > 0 ? `Increased media mentions by ${mediaMentionsIncrease}` : null,
      startupConnections.length > 0 ? `Made ${startupConnections.length} strategic introductions` : null,
    ].filter(Boolean);
    
    const newStory = {
      id,
      startupId,
      title: `${startup.name} Growth Story`,
      summary: `How strategic introductions and guidance helped ${startup.name} grow their business and market presence significantly.`,
      keyPoints,
      testimonial: `Hillel's guidance and introductions were pivotal in our success. His strategic advice opened doors we didn't even know existed.`,
      testimonialAuthor: `${startup.founder}, CEO of ${startup.name}`
    };
    
    setSuccessStories([...successStories, newStory]);
    return newStory;
  };

  const value = {
    startups,
    connections,
    successStories,
    addStartup,
    getStartupById,
    updateStartup,
    addConnection,
    getConnectionsByStartupId,
    getSuccessStoriesByStartupId,
    generateSuccessStory
  };

  return (
    <StartupsContext.Provider value={value}>
      {children}
    </StartupsContext.Provider>
  );
}