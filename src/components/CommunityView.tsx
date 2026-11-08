import React, { useState, useEffect } from 'react';
import { ForumThread, GearListing, ForumComment } from '../types/camera';
import { INITIAL_FORUM_THREADS, INITIAL_GEAR_LISTINGS } from '../data/forumData';
import { 
  MessageSquare, 
  Tag, 
  ThumbsUp, 
  Send, 
  Plus, 
  Search, 
  ShieldCheck, 
  MapPin, 
  Repeat, 
  DollarSign, 
  CheckCircle2, 
  X,
  User,
  Clock,
  Sparkles
} from 'lucide-react';

interface CommunityViewProps {
  listingModalOpen: boolean;
  onCloseListingModal: () => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  listingModalOpen,
  onCloseListingModal,
}) => {
  const [activeSegment, setActiveSegment] = useState<'forum' | 'exchange'>('forum');

  // Forum State
  const [threads, setThreads] = useState<ForumThread[]>(() => {
    const saved = localStorage.getItem('alphavault_forum_threads');
    return saved ? JSON.parse(saved) : INITIAL_FORUM_THREADS;
  });
  const [forumCategory, setForumCategory] = useState<string>('all');
  const [forumSearch, setForumSearch] = useState<string>('');
  const [activeExpandedThreadId, setActiveExpandedThreadId] = useState<string | null>(threads[0]?.id || null);
  const [replyInputText, setReplyInputText] = useState<string>('');
  const [showNewThreadModal, setShowNewThreadModal] = useState<boolean>(false);

  // New Thread Form
  const [newThreadTitle, setNewThreadTitle] = useState<string>('');
  const [newThreadCategory, setNewThreadCategory] = useState<'AF & Settings' | 'Street & Travel' | 'Video & Color' | 'Gear Chat'>('AF & Settings');
  const [newThreadContent, setNewThreadContent] = useState<string>('');
  const [newThreadTags, setNewThreadTags] = useState<string>('Autofocus, Tips');

  // Gear Exchange State
  const [gearListings, setGearListings] = useState<GearListing[]>(() => {
    const saved = localStorage.getItem('alphavault_gear_listings');
    return saved ? JSON.parse(saved) : INITIAL_GEAR_LISTINGS;
  });
  const [exchangeTypeFilter, setExchangeTypeFilter] = useState<string>('all');
  const [exchangeConditionFilter, setExchangeConditionFilter] = useState<string>('all');
  const [selectedGearForContact, setSelectedGearForContact] = useState<GearListing | null>(null);
  const [contactOfferAmount, setContactOfferAmount] = useState<string>('');
  const [contactMessageText, setContactMessageText] = useState<string>('');
  const [contactSentFeedback, setContactSentFeedback] = useState<string | null>(null);

  // New Gear Listing Form
  const [newListingTitle, setNewListingTitle] = useState<string>('');
  const [newListingType, setNewListingType] = useState<'Camera Body' | 'E-Mount Lens' | 'Accessory / Cage'>('Camera Body');
  const [newListingBrand, setNewListingBrand] = useState<'Sony' | 'Sigma' | 'Tamron' | 'Other'>('Sony');
  const [newListingCondition, setNewListingCondition] = useState<'Mint (Like New)' | 'Excellent (9/10)' | 'Good (8/10)' | 'User (Functional)'>('Mint (Like New)');
  const [newListingAskingPrice, setNewListingAskingPrice] = useState<string>('');
  const [newListingOriginalPrice, setNewListingOriginalPrice] = useState<string>('');
  const [newListingShutterCount, setNewListingShutterCount] = useState<string>('');
  const [newListingLocation, setNewListingLocation] = useState<string>('');
  const [newListingShipping, setNewListingShipping] = useState<'Free Insured Shipping' | 'Local Pickup Only' | 'Buyer Pays Shipping'>('Free Insured Shipping');
  const [newListingIncludes, setNewListingIncludes] = useState<string>('Original box, Battery, Caps');
  const [newListingDescription, setNewListingDescription] = useState<string>('');
  const [listingSuccessMsg, setListingSuccessMsg] = useState<string | null>(null);

  // Save to localStorage when state updates
  useEffect(() => {
    localStorage.setItem('alphavault_forum_threads', JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    localStorage.setItem('alphavault_gear_listings', JSON.stringify(gearListings));
  }, [gearListings]);

  // Forum Upvote Handler
  const handleUpvoteThread = (threadId: string) => {
    setThreads(
      threads.map((t) => (t.id === threadId ? { ...t, upvotes: t.upvotes + 1 } : t))
    );
  };

  // Add Comment to Thread
  const handleAddComment = (threadId: string) => {
    if (!replyInputText.trim()) return;
    const newComment: ForumComment = {
      id: `c-${Date.now()}`,
      author: 'You (AlphaVault Member)',
      authorRole: 'Photographer',
      avatarSeed: 'User',
      createdAt: 'Just now',
      content: replyInputText.trim(),
      upvotes: 0,
    };

    setThreads(
      threads.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            repliesCount: t.repliesCount + 1,
            comments: [...t.comments, newComment],
          };
        }
        return t;
      })
    );
    setReplyInputText('');
  };

  // Create New Thread
  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;

    const created: ForumThread = {
      id: `thread-${Date.now()}`,
      title: newThreadTitle.trim(),
      category: newThreadCategory,
      author: 'You (AlphaVault Member)',
      authorBadge: 'Sony Shooter',
      avatarSeed: 'You',
      createdAt: 'Just now',
      content: newThreadContent.trim(),
      tags: newThreadTags.split(',').map((s) => s.trim()).filter(Boolean),
      upvotes: 1,
      repliesCount: 0,
      comments: [],
    };

    setThreads([created, ...threads]);
    setActiveExpandedThreadId(created.id);
    setShowNewThreadModal(false);
    setNewThreadTitle('');
    setNewThreadContent('');
  };

  // Create New Gear Listing
  const handleCreateGearListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListingTitle.trim() || !newListingAskingPrice) return;

    const createdListing: GearListing = {
      id: `gear-${Date.now()}`,
      title: newListingTitle.trim(),
      itemType: newListingType,
      brand: newListingBrand,
      condition: newListingCondition,
      askingPrice: parseFloat(newListingAskingPrice),
      originalPrice: newListingOriginalPrice ? parseFloat(newListingOriginalPrice) : parseFloat(newListingAskingPrice) * 1.3,
      shutterCount: newListingShutterCount ? parseInt(newListingShutterCount) : undefined,
      location: newListingLocation.trim() || 'United States',
      shippingOption: newListingShipping,
      sellerName: 'You (AlphaVault Verified)',
      sellerRating: 5.0,
      sellerDealsCount: 1,
      tradeOffersAccepted: true,
      includesList: newListingIncludes.split(',').map((s) => s.trim()).filter(Boolean),
      description: newListingDescription.trim() || 'Tested and verified working condition.',
      postedAt: 'Just now',
      isUserCreated: true,
    };

    setGearListings([createdListing, ...gearListings]);
    setListingSuccessMsg('Gear listing published! It is now live on the AlphaVault Gear Exchange.');
    setTimeout(() => {
      setListingSuccessMsg(null);
      onCloseListingModal();
      setActiveSegment('exchange');
      setNewListingTitle('');
      setNewListingAskingPrice('');
      setNewListingDescription('');
    }, 1500);
  };

  // Send Offer / Message to Seller
  const handleSendContactMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSentFeedback(`Message sent to ${selectedGearForContact?.sellerName}! You will receive their reply via email.`);
    setTimeout(() => {
      setSelectedGearForContact(null);
      setContactSentFeedback(null);
      setContactOfferAmount('');
      setContactMessageText('');
    }, 2000);
  };

  const filteredThreads = threads.filter((t) => {
    if (forumCategory !== 'all' && t.category !== forumCategory) return false;
    if (forumSearch.trim()) {
      const q = forumSearch.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.content.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const filteredGear = gearListings.filter((g) => {
    if (exchangeTypeFilter !== 'all' && g.itemType !== exchangeTypeFilter) return false;
    if (exchangeConditionFilter !== 'all' && !g.condition.includes(exchangeConditionFilter)) return false;
    return true;
  });

  const activeThread = threads.find((t) => t.id === activeExpandedThreadId) || threads[0];

  return (
    <div className="space-y-8">
      {/* Top Segment Controller */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Sony Alpha Community & Gear Exchange
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Exchange shooting tips, autofocus techniques, and buy/sell certified Sony mirrorless equipment.
          </p>
        </div>

        {/* Segmented Switcher */}
        <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg">
          <button
            onClick={() => setActiveSegment('forum')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-2 ${
              activeSegment === 'forum'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
            <span>Tips & Discussions ({threads.length})</span>
          </button>
          <button
            onClick={() => setActiveSegment('exchange')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-2 ${
              activeSegment === 'exchange'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Repeat className="w-3.5 h-3.5 text-orange-400" />
            <span>Gear Exchange Marketplace ({gearListings.length})</span>
          </button>
        </div>
      </div>

      {/* ================= SECTION 1: FORUM & TIPS ================= */}
      {activeSegment === 'forum' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
            <div className="flex flex-wrap items-center gap-1.5">
              {['all', 'AF & Settings', 'Street & Travel', 'Video & Color', 'Gear Chat'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setForumCategory(cat)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    forumCategory === cat
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Topics' : cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={forumSearch}
                  onChange={(e) => setForumSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 placeholder:text-zinc-500"
                />
              </div>

              <button
                onClick={() => setShowNewThreadModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-zinc-950 font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Start Discussion</span>
              </button>
            </div>
          </div>

          {/* Master-Detail Discussion Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Thread List */}
            <div className="lg:col-span-5 space-y-3">
              {filteredThreads.map((thread) => {
                const isActive = thread.id === activeExpandedThreadId;
                return (
                  <div
                    key={thread.id}
                    onClick={() => setActiveExpandedThreadId(thread.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-zinc-800 border-orange-500/60 shadow-md'
                        : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
                      <span className="font-semibold text-orange-400">{thread.category}</span>
                      <span className="font-mono">{thread.createdAt}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {thread.title}
                    </h4>

                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {thread.content}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/80 text-xs text-zinc-400">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-zinc-300">{thread.author}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3 text-zinc-500" />
                          <span className="font-mono">{thread.upvotes}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-zinc-500" />
                          <span className="font-mono">{thread.repliesCount}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Full Thread Viewer & Reply Area */}
            <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-7 space-y-6">
              {activeThread ? (
                <>
                  {/* Thread Header */}
                  <div className="space-y-2 border-b border-zinc-800 pb-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                        {activeThread.category}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">{activeThread.createdAt}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white leading-snug">
                      {activeThread.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-800 text-orange-400 font-bold flex items-center justify-center text-xs">
                          {activeThread.author.charAt(0)}
                        </div>
                        <span className="text-zinc-200 font-semibold">{activeThread.author}</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-zinc-400">{activeThread.authorBadge}</span>
                      </div>

                      <button
                        onClick={() => handleUpvoteThread(activeThread.id)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-orange-400" />
                        <span className="font-mono font-bold">{activeThread.upvotes}</span>
                        <span>Helpful</span>
                      </button>
                    </div>
                  </div>

                  {/* Thread Post Body */}
                  <div className="text-sm text-zinc-200 leading-relaxed space-y-3 whitespace-pre-line">
                    {activeThread.content}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-zinc-400">
                    <span className="text-zinc-500 font-medium">Tags:</span>
                    {activeThread.tags.map((tag, idx) => (
                      <span key={idx} className="text-zinc-300">
                        #{tag} {idx < activeThread.tags.length - 1 ? '·' : ''}
                      </span>
                    ))}
                  </div>

                  {/* Replies Section */}
                  <div className="space-y-4 pt-4 border-t border-zinc-800">
                    <div className="flex items-center justify-between text-xs">
                      <h4 className="font-bold text-white uppercase tracking-wider">
                        Community Replies ({activeThread.comments.length})
                      </h4>
                    </div>

                    {/* Comment List */}
                    <div className="space-y-3">
                      {activeThread.comments.length === 0 ? (
                        <p className="text-xs text-zinc-500 italic">No replies yet. Be the first to share your thoughts!</p>
                      ) : (
                        activeThread.comments.map((comment) => (
                          <div key={comment.id} className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-zinc-200">{comment.author}</span>
                                {comment.authorRole && (
                                  <span className="text-zinc-500">· {comment.authorRole}</span>
                                )}
                              </div>
                              <span className="font-mono text-zinc-500">{comment.createdAt}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{comment.content}</p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Quick Reply Form */}
                    <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                      <label className="block text-xs font-semibold text-zinc-300">
                        Post a Helpful Tip or Reply
                      </label>
                      <div className="flex gap-2">
                        <textarea
                          rows={2}
                          value={replyInputText}
                          onChange={(e) => setReplyInputText(e.target.value)}
                          placeholder="Share your camera experience or answer..."
                          className="flex-1 p-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 placeholder:text-zinc-500 resize-none"
                        />
                        <button
                          onClick={() => handleAddComment(activeThread.id)}
                          className="px-4 bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-zinc-500 text-xs">
                  Select a discussion on the left to read full conversation.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 2: GEAR EXCHANGE MARKETPLACE ================= */}
      {activeSegment === 'exchange' && (
        <div className="space-y-6">
          {/* Marketplace Filter Strip */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
            <div className="flex flex-wrap items-center gap-1.5">
              {['all', 'Camera Body', 'E-Mount Lens', 'Accessory / Cage'].map((type) => (
                <button
                  key={type}
                  onClick={() => setExchangeTypeFilter(type)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    exchangeTypeFilter === type
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {type === 'all' ? 'All Gear' : type}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={exchangeConditionFilter}
                onChange={(e) => setExchangeConditionFilter(e.target.value)}
                className="px-3 py-1.5 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="all">Any Condition</option>
                <option value="Mint">Mint (Like New)</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
              </select>
            </div>
          </div>

          {/* Gear Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGear.map((listing) => (
              <div
                key={listing.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                    <span className="font-semibold text-orange-400">{listing.itemType}</span>
                    <span className="font-mono">{listing.postedAt}</span>
                  </div>

                  <h4 className="text-base font-bold text-white leading-snug">
                    {listing.title}
                  </h4>

                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {listing.description}
                  </p>

                  {/* Condition & Spec Metrics (unboxed text) */}
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Condition:</span>
                      <span className="text-zinc-200 font-semibold">{listing.condition}</span>
                    </div>

                    {listing.shutterCount && (
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Shutter Count:</span>
                        <span className="text-emerald-400 font-mono font-semibold tabular-nums">
                          {listing.shutterCount.toLocaleString()} actuations
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Location:</span>
                      <span className="text-zinc-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-400" />
                        {listing.location}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Shipping:</span>
                      <span className="text-zinc-300">{listing.shippingOption}</span>
                    </div>
                  </div>

                  {/* Included Items */}
                  <div className="mt-3 pt-3 border-t border-zinc-800/80 text-xs text-zinc-400">
                    <span className="text-zinc-500 block mb-1">Includes:</span>
                    <span className="text-zinc-300">{listing.includesList.join(' · ')}</span>
                  </div>
                </div>

                {/* Seller & Action Footer */}
                <div className="pt-3 border-t border-zinc-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-zinc-500 block">Asking Price</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl font-bold text-white font-mono tabular-nums">
                          ${listing.askingPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-zinc-500 line-through font-mono tabular-nums">
                          ${listing.originalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-right text-xs">
                      <span className="text-zinc-300 font-semibold block">{listing.sellerName}</span>
                      <span className="text-zinc-500">★ {listing.sellerRating} ({listing.sellerDealsCount} deals)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedGearForContact(listing);
                      setContactOfferAmount(listing.askingPrice.toString());
                    }}
                    className="w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-zinc-950 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Contact Seller / Make Offer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= MODAL: START NEW DISCUSSION ================= */}
      {showNewThreadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white">Start a Sony Community Discussion</h3>
              <button
                onClick={() => setShowNewThreadModal(false)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateThread} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Discussion Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Best custom button assignments for wedding shooters"
                  value={newThreadTitle}
                  onChange={(e) => setNewThreadTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Category
                </label>
                <select
                  value={newThreadCategory}
                  onChange={(e: any) => setNewThreadCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="AF & Settings">AF & Settings</option>
                  <option value="Street & Travel">Street & Travel</option>
                  <option value="Video & Color">Video & Color</option>
                  <option value="Gear Chat">Gear Chat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Discussion Details / Tip
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain your technique, camera settings, or question in detail..."
                  value={newThreadContent}
                  onChange={(e) => setNewThreadContent(e.target.value)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="A7 IV, Autofocus, Weddings"
                  value={newThreadTags}
                  onChange={(e) => setNewThreadTags(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewThreadModal(false)}
                  className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-zinc-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Publish Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: CONTACT SELLER ================= */}
      {selectedGearForContact && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Message Verified Seller</h3>
                <span className="text-xs text-zinc-400">{selectedGearForContact.sellerName}</span>
              </div>
              <button
                onClick={() => setSelectedGearForContact(null)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {contactSentFeedback ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-xl text-xs text-emerald-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Inquiry Dispatched</span>
                </div>
                <p>{contactSentFeedback}</p>
              </div>
            ) : (
              <form onSubmit={handleSendContactMessage} className="space-y-4">
                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-xs">
                  <span className="text-zinc-400 block">Listing:</span>
                  <span className="text-white font-bold">{selectedGearForContact.title}</span>
                  <div className="text-zinc-400 mt-1">
                    Asking: <strong className="text-white font-mono">${selectedGearForContact.askingPrice}</strong> · Condition: {selectedGearForContact.condition}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Your Offer Amount ($ USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-mono text-xs">$</span>
                    <input
                      type="number"
                      required
                      value={contactOfferAmount}
                      onChange={(e) => setContactOfferAmount(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Message to Seller
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Hi! I am interested in purchasing this gear. Would you be open to shipping or local meetup?"
                    value={contactMessageText}
                    onChange={(e) => setContactMessageText(e.target.value)}
                    className="w-full p-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedGearForContact(null)}
                    className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-zinc-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Send Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL: POST GEAR LISTING ================= */}
      {listingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Post Gear for Sale or Trade</h3>
                <p className="text-xs text-zinc-400">Reach thousands of Sony photographers with zero listing fees.</p>
              </div>
              <button
                onClick={onCloseListingModal}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {listingSuccessMsg ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-xl text-xs text-emerald-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Listing Published</span>
                </div>
                <p>{listingSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleCreateGearListing} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Item Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sony Alpha 7 IV Body - Boxed with Low Shutter"
                    value={newListingTitle}
                    onChange={(e) => setNewListingTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Gear Category
                    </label>
                    <select
                      value={newListingType}
                      onChange={(e: any) => setNewListingType(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option value="Camera Body">Camera Body</option>
                      <option value="E-Mount Lens">E-Mount Lens</option>
                      <option value="Accessory / Cage">Accessory / Cage</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Condition
                    </label>
                    <select
                      value={newListingCondition}
                      onChange={(e: any) => setNewListingCondition(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option value="Mint (Like New)">Mint (Like New)</option>
                      <option value="Excellent (9/10)">Excellent (9/10)</option>
                      <option value="Good (8/10)">Good (8/10)</option>
                      <option value="User (Functional)">User (Functional)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Asking Price ($ USD)
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="1750"
                      value={newListingAskingPrice}
                      onChange={(e) => setNewListingAskingPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Shutter Count (if body)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 4200"
                      value={newListingShutterCount}
                      onChange={(e) => setNewListingShutterCount(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Your Location (City, State / Country)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. San Francisco, CA"
                    value={newListingLocation}
                    onChange={(e) => setNewListingLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Included Accessories (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Original box, NP-FZ100 battery, strap, lens hood"
                    value={newListingIncludes}
                    onChange={(e) => setNewListingIncludes(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Detailed Gear Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe usage history, sensor hygiene, cosmetic condition, reason for selling..."
                    value={newListingDescription}
                    onChange={(e) => setNewListingDescription(e.target.value)}
                    className="w-full p-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={onCloseListingModal}
                    className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Publish Listing Now
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
