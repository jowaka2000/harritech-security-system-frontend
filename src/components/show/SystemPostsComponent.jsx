import React from "react";
import { formatDistanceToNow } from "date-fns";
import { FileText, Clock, Image as ImageIcon } from "lucide-react";

const SystemPostsComponent = ({ name, error, posts, loading }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" /> 
          {name} Updates
        </h3>
      </div>

      <div className="p-5 max-h-[400px] overflow-y-auto space-y-6">
        {loading && <div className="flex justify-center py-8 text-slate-400 text-sm animate-pulse">Loading updates...</div>}
        {error && <div className="text-red-500 text-sm p-2 text-center bg-red-50 rounded-lg border border-red-100">{error}</div>}
        
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm italic border-2 border-dashed border-slate-100 rounded-xl">
            No updates yet.
          </div>
        )}

        {posts.map((post, index) => (
          <div key={index} className="flex gap-4 group relative">
            
            {/* Left: Timeline Line & Date */}
            <div className="flex flex-col items-center min-w-[60px]">
              {/* The Dot */}
              <div className="w-3 h-3 bg-blue-100 rounded-full border-2 border-blue-500 z-10 relative top-5"></div>
              {/* The Line */}
              <div className="h-full w-0.5 bg-slate-200 my-2"></div>
              
              {/* Date Text */}
              <div className="flex flex-col items-center mt-4">
                 <span className="text-sm font-bold text-slate-700">
                    {new Date(post.created_at).getDate()}
                 </span>
                 <span className="text-[10px] text-slate-400 uppercase">
                    {new Date(post.created_at).toLocaleString('default', { month: 'short' })}
                 </span>
              </div>
            </div>

            {/* Right: Content Card */}
            <div className="flex-1 relative">
              <div className="flex flex-col sm:flex-row gap-4 bg-white border border-slate-100 rounded-xl p-3 hover:shadow-md hover:border-blue-200 transition-all duration-300">
                
                {/* Text Content */}
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                  </div>
                </div>

                {/* Image (if exists) */}
                {post.image && (
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                    <img 
                      src={post.image} 
                      alt="Attachment" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Play icon overlay if it were a video (optional polish) */}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemPostsComponent;