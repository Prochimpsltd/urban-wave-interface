
import React from 'react';
import { Book, Search, Plus, FileText, Trash, PencilLine, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock data for knowledge bases
const knowledgeBases = [
  {
    id: '1',
    name: 'Support Documentation',
    sourceUrl: 'https://support.example.com',
    crawlDate: '2023-05-15',
    documents: 128,
    status: 'active',
  },
  {
    id: '2',
    name: 'Product Catalog',
    sourceUrl: 'https://products.example.com',
    crawlDate: '2023-05-10',
    documents: 67,
    status: 'active',
  },
  {
    id: '3',
    name: 'Technical Manuals',
    sourceUrl: 'https://tech.example.com',
    crawlDate: '2023-05-03',
    documents: 94,
    status: 'active',
  },
  {
    id: '4',
    name: 'Property Listings',
    sourceUrl: 'https://properties.example.com',
    crawlDate: '2023-04-28',
    documents: 215,
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Medical Knowledge',
    sourceUrl: 'https://medical.example.com',
    crawlDate: '2023-04-20',
    documents: 156,
    status: 'active',
  },
];

const KnowledgeBaseContent: React.FC = () => {
  return (
    <div className="ml-64 p-6 bg-urban-dark min-h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-1">Knowledge Base</h1>
        <p className="text-muted-foreground mb-6">Manage your chatbot's knowledge sources</p>
        
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search knowledge bases..." 
              className="pl-10 bg-urban-dark-3 border-none"
            />
          </div>
          <Button className="bg-urban-teal hover:bg-urban-teal/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Knowledge Base
          </Button>
        </div>
        
        {/* Table view for knowledge bases */}
        <div className="rounded-md overflow-hidden border border-white/10">
          <Table>
            <TableHeader className="bg-urban-dark-2">
              <TableRow className="border-b border-white/10 hover:bg-transparent">
                <TableHead className="text-white">Knowledge Base</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Source</TableHead>
                <TableHead className="text-white">Documents</TableHead>
                <TableHead className="text-white">Last Crawled</TableHead>
                <TableHead className="text-white text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {knowledgeBases.map((kb) => (
                <TableRow 
                  key={kb.id}
                  className="border-b border-white/10 hover:bg-urban-dark-2"
                >
                  <TableCell>
                    <div className="flex items-center">
                      <div className="rounded-full bg-urban-dark p-2 mr-3">
                        <FileText className="h-5 w-5 text-urban-purple" />
                      </div>
                      <div>
                        <p className="font-medium">{kb.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={kb.status === 'active' ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-400"}>
                      {kb.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-urban-teal flex items-center">
                    <span className="mr-1 truncate max-w-[180px]">{kb.sourceUrl}</span>
                    <ExternalLink className="h-3 w-3 text-gray-400" />
                  </TableCell>
                  <TableCell>{kb.documents}</TableCell>
                  <TableCell>{new Date(kb.crawlDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <PencilLine className="h-4 w-4" />
                      </Button>
                      <Button 
                        className="bg-urban-purple hover:bg-urban-purple/90 h-8 flex items-center"
                        size="sm"
                      >
                        <Book className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-500/10 h-8 w-8">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseContent;
